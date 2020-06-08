import React from 'react';

import {toBase64, getFormData} from './utils'

import './app.css';

import { ReactComponent as Logo } from './logo.svg';
import star from './star.svg';

export const App = () => {
  const onSubmit = async(event) => { 
    const file = event.target[1].files[0];
    const identification = event.target[0].value;

    debugger;

    if(file) {
        let validSize = file.size <= 10485760;
        const fileBase64 = await toBase64(file);
        const data = getFormData(file.name, fileBase64, identification);

        fetch("http://localhost:8080/file",
          {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
          })
          .then((response) => {
            debugger;
            return response.blob();
          })
          .then(blob => {
              debugger;
              const url = window.URL.createObjectURL(blob);
              let a = document.createElement('a');
              a.href = url;
              a.download = "report.txt";
              document.body.appendChild(a);
              a.click();    
              a.remove();
          });
        }

    return false;
  }
  return (
    <div className="app">
      <header className="flex">
        <h1>Welcome to Mudanzas Lazy Loading!</h1>
      </header>
      <main>
        <h2>Please, upload the input file</h2>
        
        <div className="flex github-star-container">
        
          <form action="" onSubmit={(event) => {
            event.preventDefault();
            onSubmit(event);
            return false;
          }}>
            <label >Cédula: </label>
            <input type="text" data-test-id="cedula" name="dni"/>
            <br/><br/>
            <label>Select a file: </label>
            <input type="file" data-test-id="archivo" name="file"/>
            <br/><br/>
            <input type="submit" value="Enviar"/> 
          </form>
        </div>
      </main>
    </div>
  );
};

export default App;
