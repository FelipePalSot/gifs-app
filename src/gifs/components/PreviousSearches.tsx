import React from 'react';
import type { FC } from 'react';

interface Props{
    title?: string,
    searches: string[],
    onLabelClicked: (term: string) => void;
};

export const PreviousSearches: FC<Props> = ({title, searches, onLabelClicked}) => {
  return (
    <div className="previous-searches">
       <h2>{title}</h2>
       <ul className="previous-searches-list">
            {searches.map((term)=>(
                <li key={term}
                onClick={() =>onLabelClicked(term)}
                >{term}
                </li>
            ))}
       </ul>
    </div>
  )
}
