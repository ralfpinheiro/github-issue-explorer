import React, { Component } from 'react';
import axios from 'axios';
import UserForm from './components/UserForm';
import IssueList from './components/IssueList';
import NavBar from './components/NavBar';
import { isURL } from 'validator';
import { ReactComponent as CloseSVG } from './_assets/icons/close.svg';
import Spinner from './components/Spinner';
import './styles/App.css';

// Base API Url
const apiURL = 'https://api.github.com/repos';

class App extends Component {
  state = {
    urlInput: '',
    page: 1,
    issues: [],
    loading: false,
    error: '',
    done: false,
    filteredIssues: [],
    placeholder: 'Paste a link to a GitHub repo!',
    filterIcon: ''
  };

  // Checks if URL starts with protocol and adds it if not.
  checkUrlFormat = url => {
    if (url.startsWith('www')) {
      return 'https://' + url;
    } else {
      return url;
    }
  };

  // Gets Owner and Repo by splitting the pathname. The first item of array is an empty string due to the first '/' (E.g: /facebook/react)
  getOwnerAndRepo = url => {
    // const urlObject = new URL(url);
    const githubObject = {};
    if (url.host === 'github.com') {
      const array = url.pathname.split('/');
      githubObject.owner = array[1] || '';
      githubObject.repo = array[2] || '';
    }
    return githubObject;
  };

  // Resets state when closing search results
  closeIssueList = () => {
    this.setState({
      done: null,
      issues: [],
      urlInput: '',
      filteredIssues: []
    });
  };

  // Filters status of each issue
  getFilteredList = e => {
    let filteredIssues = [];
    switch (e.target.id) {
      case 'open':
      case 'closed': {
        filteredIssues = this.state.issues.filter(issue => {
          return issue.state === e.target.id && !issue.pull_request;
        });
        break;
      }
      case 'pull_request':
        filteredIssues = this.state.issues.filter(issue => {
          return issue.pull_request;
        });
        break;
      default:
        filteredIssues = this.state.issues;
    }
    this.setState({
      filteredIssues
    });
  };

  handleChange = event => {
    const url = event.target.value;
    this.setState({
      urlInput: url
    });
  };
  // Requests API data via axio request and load issues
  getIssues = e => {
    e.preventDefault();
    this.setState({
      loading: true
    });
    let url = this.checkUrlFormat(this.state.urlInput);
    if (isURL(url)) {
      url = new URL(url);
    } else {
      return this.setState({
        error: 'Invalid URL, please try again',
        loading: false
      });
    }

    const { repo, owner } = this.getOwnerAndRepo(url);
    axios
      .get(window.encodeURI(`${apiURL}/${owner}/${repo}/issues`), {
        params: {
          state: 'all',
          per_page: 60,
          page: this.state.page
        }
      })
      .then(res => {
        setTimeout(() => {
          this.setState({
            issues: res.data,
            loading: false,
            error: '',
            done: true
          });
        }, 300);
      })
      .catch(error => {
        this.setState({
          error: error || 'Please enter a valid repo URL',
          loading: false
        });
      });
  };

  render() {
    const { urlInput, issues, loading, page, filteredIssues } = this.state;
    return (
      <div className='App'>
        {this.state.done ? (
          <div>
            <IssueList
              filter={this.getFilteredList}
              url={urlInput}
              page={page}
              loading={loading}
              issues={(filteredIssues.length && filteredIssues) || issues}
            />
            <NavBar getFilteredList={this.getFilteredList} />
            <CloseSVG className='close' onClick={this.closeIssueList} />
          </div>
        ) : (
          <div>
            <div className='Homepage'>
              <h1 className='MainLogo'>GitHub Issue Viewer</h1>
              <UserForm
                placeholderText={this.state.placeholder}
                getIssues={this.getIssues}
                handleChange={this.handleChange}
              />
              {/* Error check */}
              {this.state.error ? (
                <p className='ErrorMsg'>
                  {this.state.error && (
                    <span>
                      Please enter a valid repo URL
                      <p className='example'>( https://github.com/owner/repo )</p>
                    </span>
                  )}
                </p>
              ) : (
                ''
              )}
              {this.state.loading && <Spinner />}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
