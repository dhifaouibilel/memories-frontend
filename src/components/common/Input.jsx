import React from 'react'
import { Grid, TextField, IconButton, InputAdornment } from '@mui/material'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

function Input({name, label, type, value, onChange, autoFocus, required, half, handleShowPassword, onSubmit, handleKeyDown, disabled, rows, register, errors}) {
  return (
     <Grid item xs={12} sm={half?6:12}>
        <TextField 
            name={name}
            id={name}
            label={label}
            type={type}
            multiline={!!rows}
            rows={rows}
            onChange={onChange}
            value={value}
            {...register(name)}
            autoFocus={autoFocus}
            aria-invalid={errors[name] ? "true" : "false"}
            onKeyDown={onSubmit&&handleKeyDown}
            required={required}
            fullWidth
            disabled={disabled}
            error={!!errors[name]}
            helperText={errors[name] && `${errors[name]?.message}.`}
            variant='outlined'
            InputProps={name==='password' ? {
                endAdornment: (
                    <InputAdornment position='end'>
                        <IconButton onClick={handleShowPassword}>
                            {type==='password' ?<VisibilityRoundedIcon /> : <VisibilityOffRoundedIcon />}
                        </IconButton>
                    </InputAdornment>
                )
            }: onSubmit? {endAdornment: (
                    <InputAdornment position='end'>
                        <IconButton onClick={onSubmit}>
                            <SendRoundedIcon />
                        </IconButton>
                    </InputAdornment>
                )} : {}}
        />
     </Grid>
  )
}

export default Input