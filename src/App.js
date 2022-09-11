import logo from './logo.svg';
import './App.css';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Button, Container, Dialog, DialogContent, IconButton, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import anime from 'animejs'
import { ArrowForwardIos, ReplaySharp, Person2Rounded } from '@mui/icons-material'
const statusEnum = { dialog: 'dialog', animating: 'animating', finished: 'finished' }
function App() {
  const [status, setStatus] = useState(statusEnum.dialog)
  const [name, setName] = useState('')
  const [isMale, setIsMale] = useState(true)
  const elements = useRef({ m1: [], m2: [] }).current
  const onEnter = useCallback((ev) => {
    if (ev.keyCode === 10 || ev.keyCode === 13) {console.log('>saved name: ',name); setName((name || 'ኢትዮጵያ')); setStatus(statusEnum.animating) }
  }, [name])
  const onEdit = useCallback((ev) => setName((ev.target)?.value || ''), [true])
  console.log('rendered with gender of ', isMale, ' name of ', name)
  const toggleGender = useCallback(() => { setIsMale(!isMale) }, [isMale])
  const randomAngle = useCallback(() => Math.floor(Math.random() * 45 - 22.5) + "deg", [true])
  const hideAll = useCallback(() => { anime({ targets: [elements.m1, elements.m2, elements.name, elements.buttons], opacity: 0 }) }, [true])
  useEffect(() => {
    if (status === statusEnum.animating && elements.m1 && elements.m2) {
      anime({ targets: elements.m1, rotate: [0, randomAngle, randomAngle, 0, randomAngle, 0], duration: 10000, loop: true, easing: 'linear' })
      anime.timeline().add({ targets: elements.m1, opacity: [0, 1], duration: 1500, delay: anime.stagger(200, { start: 300 }) })
        .add({ targets: elements.m2, translateX: ['-80%', 0], scale: [0.7, 1.1, 1], opacity: { value: [0, 1], duration: 300 }, duration: 600, delay: anime.stagger(200, { start: 300 }), easing: "easeOutQuad" })
        .add({ targets: elements.name, opacity: [0, 1], translateY: ['60%', 0], scale: [0.7, 1], duration: 1500, easing: "easeOutQuad" })
        .add({ targets: elements.buttons, opacity: [0, 1], delay: 1500, complete: setStatus(statusEnum.finished) })
    }
  }, [status])
  useEffect(() => {
    if (elements.background && !elements.backgroundStarted) {
      const getRandomOffsetPercent = () => -(Math.floor(Math.random() * 33));
      elements.backgroundStarted = true;
      anime({
        targets: elements.background, keyframes: [
          { scale: 1, translateX: '0%', translateY: '0%', duration: 9000, delay: 2000 },
          { scale: 1.3, translateX: getRandomOffsetPercent(), translateY: getRandomOffsetPercent(), duration: 9000, delay: 2000 },
          { scale: 1, translateX: '0%', translateY: '0%', duration: 9000, delay: 2000 },
          { scale: 1.3, translateX: getRandomOffsetPercent(), translateY: getRandomOffsetPercent(), duration: 9000, delay: 2000 },
          { scale: 1, translateX: '0%', translateY: '0%', duration: 9000, delay: 2000 },
          { scale: 1.3, translateX: getRandomOffsetPercent(), translateY: getRandomOffsetPercent(), duration: 9000, delay: 2000 },
          { scale: 1, translateX: '0%', translateY: '0%', duration: 9000, delay: 2000 },
          { scale: 1.3, translateX: getRandomOffsetPercent(), translateY: getRandomOffsetPercent(), duration: 9000, delay: 2000 },
          { scale: 1, translateX: '0%', translateY: '0%', duration: 9000, delay: 2000 },
          { scale: 1.3, translateX: getRandomOffsetPercent(), translateY: getRandomOffsetPercent(), duration: 9000, delay: 2000 },
          { scale: 1, translateX: '0%', translateY: '0%', duration: 9000, delay: 2000 },
          { scale: 1.3, translateX: getRandomOffsetPercent(), translateY: getRandomOffsetPercent(), duration: 9000, delay: 2000 },
          { scale: 1, translateX: '0%', translateY: '0%', duration: 9000, delay: 2000 }
        ],
        loop: true, easing: "linear"
      })
    }
  }, [true])
  return (
    <Stack sx={{ justifyContent: 'center', height: '100%', display: 'flex' }}>
      <div style={{ position: 'absolute', height: '100%', width: '100%', overflow: 'hidden' }}>
        <img ref={el => elements.background = el} style={{ filter: 'blur(4px) brightness(0.7)', height: '150%', width: '150%', objectFit: 'cover' }} src='./sunflowers-portrait.jpg'></img>
      </div>
      <Container sx={{ padding: '8mm', alignItems: 'center', justifyContent: 'center', display: 'flex', flexFlow: 'row wrap' }}>
        {Array.from(`እንኳን ለአዲሱ ዓመት በሰላም አደረሰን አደረሰ${isMale ? 'ህ' : 'ሽ'}`).map((ch, ind) =>
          <span key={ind} style={{ whiteSpace: 'pre', color: 'goldenrod', fontWeight:'bold',fontSize: '2.5rem', fontFamily: 'jiret', display: 'inline-block', opacity: 0 }} ref={(el => el && elements.m1.push(el))}>{ch}</span>
        )}
      </Container>
      <Container sx={{ padding: '4mm', paddingTop: '8mm', paddingBottom: '8mm', alignItems: 'center', justifyContent: 'center', display: 'flex', flexFlow: 'row wrap' }}>
        {Array.from(`፪፻፲፭ የተሰፋና የስኬት ዓመት ይሁንል${isMale ? 'ህ' : 'ሽ'}`).map((ch, ind) =>
          <span key={ind} style={{ whiteSpace: 'pre', color: 'brown', fontSize: '2rem', fontFamily: 'wookianos', display: 'inline-block', opacity: 0, transform: 'translateX(-100%) scale:0.7' }} ref={(el => el && elements.m2.push(el))}>{ch}</span>
        )}
      </Container>
      <Box sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
        <h1 style={{ fontSize: '3rem', color: 'goldenrod',fontFamily: 'wookianos', opacity: 0, transform: 'translateY(60%) scale(0.7)', }} ref={(el) => elements.name = el}>{`ለ${name}`}</h1>
      </Box>
      <Stack ref={el => elements.buttons = el} direction={'row'} spacing={3} sx={{ justifyContent: 'center', padding: '8mm', opacity: 0, color: 'white' }}>
        <IconButton onClick={() => { if (status === statusEnum.finished) { hideAll(); setStatus(statusEnum.animating) } }}><ReplaySharp></ReplaySharp> </IconButton>
        <IconButton onClick={() => { if (status === statusEnum.finished) { hideAll(); setStatus(statusEnum.dialog) } }}><Person2Rounded /></IconButton>

      </Stack>
      <Dialog open={status == statusEnum.dialog}>
        <DialogContent>
          <Stack direction="column" >
            <TextField style={{border: 'goldenrod',outline:'goldenrod' ,fontFamily: 'wookianos'}} value={name} variant='outlined' placeholder='ስምዎትን ያስገቡ' lang='amh' onChange={onEdit} onKeyDown={onEnter}></TextField>
            <Stack direction={'row'} sx={{ alignItems: 'center', justifyContent: 'space-between', paddingTop: '6mm', paddingBottom: '6mm' }}>
              <Button style={{ backgroundColor: 'goldenrod', color: 'white' ,fontFamily: 'wookianos'}} onClick={toggleGender}> {isMale ? 'ወንድ' : 'ሴት'}</Button>
              <IconButton onClick={(ev) => { setName(name || 'ኢትዮጵያ'); setStatus(statusEnum.animating) }}><ArrowForwardIos /></IconButton>
            </Stack>
            <Typography
              variant='body2'><a style={{ textDecoration: 'none', color: 'gray' }} href="mailto:yonatha12345678910@gmail.com">@yonathan_ash</a></Typography>
          </Stack>
        </DialogContent>
      </Dialog>
    </Stack >
  );
}

export default App;
