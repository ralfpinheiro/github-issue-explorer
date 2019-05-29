import React from 'react';
import TextTruncate from 'react-text-truncate';
import { ReactComponent as PullRequestSVG } from '../_assets/icons/pull-request.svg';
import { ReactComponent as IssueClosedSVG } from '../_assets/icons/issue-closed.svg';
import '../styles/Issue.css';

const Issue = ({ issue }) => {
  let status = '';
  if (issue.pull_request) {
    status = <PullRequestSVG className='PullRequest' />;
  } else if (issue.state === 'closed') {
    status = <IssueClosedSVG className='ClosedIssue' />;
  }

  return (
    <div>
      <div className='card'>
        <div className='card-body'>
          <div className='CardHead'>
            <TextTruncate lines={2} text={issue.title} />
            {status && status}
          </div>
          <div className='card-text'>
            <TextTruncate line={2} truncateText='…' text={issue.body ? issue.body : 'No Description'} />
          </div>
          <p className='card-link labels'>{issue.labels.length ? issue.labels[0].name : 'No Label'}</p>
        </div>
      </div>
    </div>
  );
};

export default Issue;
