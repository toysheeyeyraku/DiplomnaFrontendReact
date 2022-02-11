import * as React from 'react';
import './notificationCard.css'


export default function NotificationComponent(props: any) {

     return (
          <div className='notificationBody'>
               <h1>{props.props.header}</h1>
               <p>{props.props.body}</p>
               <div className='notification-dateAndAuthor'>
                    <p>{props.props.date}</p>
                    <p>{props.props.author}</p>
               </div>
          </div>
     );
}
