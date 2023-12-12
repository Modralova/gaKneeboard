import * as React from 'react';
import { styled } from '@mui/system';

const Dyed = (props) => styled('span')({
  
  color: 'darkslategray',
  backgroundColor: 'aliceblue',
  padding: 8,
  borderRadius: 4,
});

export default function BasicUsage() {
  return <Dyed>{props.children}</Dyed>;
}