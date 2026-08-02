import { Alert, Stack } from '@mui/material'

const Notification = ({ notification }) => (
  !notification
    ? null
    : <Stack sx={{ width: '100%' }} spacing={ 2 }>
        <Alert variant='outlined' severity={ notification.type }>
          { notification.text }
        </Alert>
      </Stack>
)

export default Notification