import * as React from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { AuthContext } from '../..//services/auth-service';

export function Tasks() {
  const [values, setValues] = React.useState({
    title: '',
    task_description: '',
    start_time: 0,
    end_time: 0,
    status: 0,
    group_id:'',
    created_by:'',
    assigned_to:'',
    comments: []
  });

  let auth = React.useContext(AuthContext)

  const handleChange = (prop:any) => (event:any) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <div>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel id="outlined-weight-helper-text">Title</InputLabel>
          <OutlinedInput
            id="outlined-adornment-weight"
            value={values.title}
            onChange={handleChange('weight')}
            aria-describedby="outlined-weight-helper-text"
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Description</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            value={values.task_description}
            onChange={handleChange('password')}
            label="Password"
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Status</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={values.status}
            onChange={handleChange('amount')}
            label="Amount"
          />
        </FormControl>
      </div>
    </Box>
  );
}