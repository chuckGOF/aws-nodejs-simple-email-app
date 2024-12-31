import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState } from 'react';

export default function Home() {
  const [to, setTo] = useState('');
  const [from, setFrom] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const sendEmail = async (event) => {
    event.preventDefault();
    const response = await fetch('https://bai25pb6h9.execute-api.eu-west-1.amazonaws.com/dev/contact-us', {
      body: JSON.stringify({
        to: to,
        from: from,
        subject: subject,
        message: message
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });

    const result = await response.json();
    console.log(result);
  }

    return (
      <div className='container'>
      <Head>
        <title>Contact Us</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
      <main className='main'>
        <h1 className='title'>
        Contact Us
        </h1>
    
        <div className='grid'>
        <form onSubmit={sendEmail} className={styles.form}>
          <div className={styles.formGroup}>
          <label htmlFor='to'>To: </label>
          <input id='to' name='to' type='email' 
          required className={styles.input} 
          value={to} 
          onChange={(e) => setTo(e.target.value)}/>
          </div>
    
          <div className={styles.formGroup}>
          <label htmlFor='from'>From: </label>
          <input id='from' name='from' type='email' 
          required className={styles.input} 
          value={from} 
          onChange={(e) => setFrom(e.target.value)}/>
          </div>
    
          <div className={styles.formGroup}>
          <label htmlFor='subject'>Subject: </label>
          <input id='subject' name='subject' type='text' 
          required className={styles.input} 
          value={subject} 
          onChange={(e) => setSubject(e.target.value)}/>
          </div>
    
          <div className={styles.formGroup}>
          <label htmlFor='message'>Message: </label>
          <textarea id='message' name='message' 
          required className={styles.textarea} 
          value={message} 
          onChange={(e) => setMessage(e.target.value)}/>
          </div>
    
          <button type='submit' className={styles.button}>Send Email</button>
        </form>
        </div>
      </main>
      </div>
    );
  }