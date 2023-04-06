import { useState } from "react";
import React, {useEffect}  from 'react';
import './App.css';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import BasicCard from './Card'

import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNote] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    pageOnLoad();
  });

  let pageOnLoad = async (e) => {
    await fetch("http://localhost:8080/api/notes", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS'
      }
    })
    .then(res => res.json())
    .then(result => {
      setNote(result)
    })
  }

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log({
        title: title,
        content: content,
      })

      let res = await fetch("http://localhost:8080/api/notes", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS'
        },
        body: JSON.stringify({
          title: title,
          content: content,
        }),
      });
      let resJson = await res.json();
      console.log(resJson)
      if (res.status === 200) {
        setTitle("");
        setContent("");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <Container fixed>
        <Box sx={{
            p: 2,
            bgcolor: 'background.default',
            display: 'grid',
            gridTemplateColumns: { md: '1fr 1fr' },
            gap: 2,
          }}>
          <Grid container>

            {notes.map(note => 
              <div key={note.id}>
                {/* <div key={note.id}>
                  {note.title} <br></br>{note.content}
                </div> */}
                {/* <Grid item xs={8}> */}
                  <Item elevation={3}> 
                    <BasicCard note={note}>

                    </BasicCard>
                  </Item>
                {/* </Grid> */}
              
              </div>
            )}
            
            
          </Grid>

          
        </Box>

        <Box sx={{
            p: 2,
            bgcolor: 'background.default',
            display: 'grid',
            gridTemplateColumns: { md: '1fr 1fr' },
            gap: 2,
          }}>
          <Grid container>
         
            <form onSubmit={handleSubmit}>
              <Item > 
                <input
                  type="text"
                  value={title}
                  placeholder="title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Item> 
              <Item> 
                <input
                  type="text"
                  value={content}
                  placeholder="content"
                  onChange={(e) => setContent(e.target.value)}
                />
              </Item>
              <Item>
                <button type="submit">Create</button>
              
                <div className="message">{message ? <p>{message}</p> : null}</div>
              </Item>
            </form>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default App;
