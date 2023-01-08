import { ArrowForwardIos, Person2Rounded, ReplaySharp } from '@mui/icons-material';
import { Container, Dialog, DialogContent, IconButton, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import anime from 'animejs';
import Lottie from 'lottie-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import merry_christmas from './json/merry_christmas.json';

const statusEnum = { dialog: 'dialog', animating: 'animating', finished: 'finished' }
function App() {
  const [status, setStatus] = useState(statusEnum.dialog)
  const [name, setName] = useState('')
  const elements = useRef<any>({ m1: [], buttons: null, lottie: { current: null }, year: null, lottieCont: null }).current

  const onEnter = useCallback((ev: any) => {
    if (ev.keyCode === 10 || ev.keyCode === 13) { setStatus(statusEnum.animating) }
  }, [true])
  const onEdit = useCallback((ev: any) => setName((ev.target as HTMLInputElement).value), [true])
  const hideAll = useCallback(() => {
    elements.lottie.current.stop()
    for (let ind = 0; ind < anime.running.length; ind++) {
      (anime.running[ind] as any).reset()
    }
    return anime({ targets: [elements.m1, elements.lottieCont, elements.buttons, elements.year], opacity: 0 }).finished
  }, [true])
  const formatName = useCallback((name: string) => {
    let names = name.split(' ');
    let result = '';
    for (let ind = 0; ind < names.length; ind++) {
      let n = names[ind];
      if (n.length == 0) continue;
      if (result.length != 0) result += ' ';
      result += n.charAt(0).toUpperCase();
      result += n.substring(1).toLowerCase();
    }
    return result;
  }, [true]);

  useEffect(() => {
    elements.lottie.current.playSegments([0, 100]);
  }, [true])

  useEffect(() => {
    switch (status) {
      case statusEnum.animating:

        anime({ targets: elements.m1, color: ['#DAA520', '#FFFF00', '#DAA520'], scale: [1, 1.2, 1], easing: 'linear', duration: 1000, delay: anime.stagger(200), direction: 'normal', loop: true })

        anime.timeline().add({ targets: elements.m1, duration: 500, opacity: [0, 1], easing: 'linear', delay: anime.stagger(300, { start: 300 }) })
          .add({ targets: elements.lottieCont, opacity: [0, 1], begin: () => { elements.lottie.current.stop(); elements.lottie.current.play() }, duration: 500 }).add({ delay: 6000, opacity: [0, 1], targets: [elements.buttons, elements.year], complete: () => setStatus(statusEnum.finished) })
    }
  }, [status]);

  (window as any).elements = elements;

  return (
    <Stack sx={{ overflow: 'hidden', justifyContent: 'space-between', height: '100%', display: 'flex', alignItems: 'center', backgroundColor: "#222" }}>

      <Container sx={{ padding: '12mm 8mm 8mm 8mm', alignItems: 'center', justifyContent: 'center', display: 'flex', flexFlow: 'row wrap', color: 'goldenrod', fontSize: '3em', fontFamily: 'luxury', fontWeight: 'bold' }}>
        {Array.from(`Hi, ${formatName(name) || 'there'}`).map((ch, ind) =>
          <span className="greeting" key={ind} style={{ transition: 'all 300ms', whiteSpace: 'pre', display: 'inline-block', opacity: 0 }} ref={(el => el && elements.m1.push(el))}>{ch}</span>
        )}

      </Container>


      <div style={{ padding: '8mm 0 8mm 0', opacity: 0 }} ref={ref => elements.lottieCont = ref}>
        <Lottie loop={false} autoPlay={false} style={{ width: '90vw', transform: "scale(1.2)" }} animationData={merry_christmas} lottieRef={elements.lottie} />
      </div>

      <Stack ref={el => elements.buttons = el} direction={'row'} spacing={3} sx={{ justifyContent: 'center', padding: '1mm', opacity: 0, backgroundColor: "goldenrod", borderRadius: "5mm" }}>
        <IconButton onClick={() => { if (status === statusEnum.finished) { hideAll().then(() => setStatus(statusEnum.animating)) } }}><ReplaySharp></ReplaySharp> </IconButton>
        <IconButton onClick={() => { if (status === statusEnum.finished) { hideAll().then(() => setStatus(statusEnum.dialog)) } }}><Person2Rounded /></IconButton>
      </Stack >

      <Typography id="year" ref={el => elements.year = el} sx={{ opacity: 0, justifySelf: 'flex-end', alignSelf: 'flex-end', color: 'goldenrod', padding: '2mm' }}
        variant='h6'>2023 G.C</Typography>
      <Dialog open={status == statusEnum.dialog}>
        <DialogContent>
          <Stack direction="column">
            <TextField sx={{ borderColor: 'goldenrod' }} value={name} variant='outlined' placeholder='Your name pls' lang='eng' onChange={onEdit} onKeyDown={onEnter}></TextField>
            <Stack direction={'row'} sx={{ alignItems: 'center', justifyContent: 'space-between', paddingTop: '6mm', paddingBottom: '6mm' }}><Typography
              variant='body2'><a style={{ textDecoration: 'none', color: 'gray' }} href="mailto:yonatha12345678910@gmail.com">@yonathan_ash</a></Typography>
              <IconButton onClick={(ev) => { setStatus(statusEnum.animating) }}><ArrowForwardIos /></IconButton>
            </Stack>

          </Stack>
        </DialogContent>
      </Dialog>
    </Stack >
  );
}

export default App;
