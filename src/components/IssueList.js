import React from 'react';
import Issue from './Issue';
import Header from './Header';

import '../styles/IssueList.css';

const IssueList = props => {
  const renderError = () => {
    return (
      <div>
        <div>{props.error}</div>
      </div>
    );
  };

  const renderList = () => {
    const { error, issues } = props;
    if (error) {
      return renderError();
    }

    return (
      <div>
        <Header currentURL={props.url} />
        {!issues.length ? (
          <div className='noResults'>No issues found!</div>
        ) : (
          <div className='container IssueList'>
            <div className='row'>
              {issues.map((issue, index, filterIcon) => (
                <div className='col' key={issue.id}>
                  <Issue issue={issue} index={index} key={issue.id} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };
  return renderList();
};

export default IssueList;
