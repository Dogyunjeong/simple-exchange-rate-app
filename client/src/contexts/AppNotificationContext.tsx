import React, { useState } from 'react'
import ExpectedAPIError from '../utils/ExpectedAPIError'
import { Snackbar, Alert } from '../components/MaterialUI'


type APIErrorStateType = Error | ExpectedAPIError | null

interface IAppNotificationContext {
  logError: React.Dispatch<React.SetStateAction<APIErrorStateType>>
  logWarn: (message: string) => void
  logSuccess: (message: string) => void
}

const AppNotificationContext = React.createContext<IAppNotificationContext>({
  logError: () => { },
  logWarn: () => { },
  logSuccess: () => { },
})

const NOTIFICATION_DURATION = 2000
// The top level component that will wrap our app's core features
const AppNotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [error, logError] = useState<APIErrorStateType>(null)
  const [success, logSuccess] = useState<string | null>(null)
  const [warnMessage, logWarn] = useState<string | null>(null)

  React.useEffect(() => {
    if (success) {
      setTimeout(() => {
        logSuccess(null)
      }, NOTIFICATION_DURATION)
    }
  }, [success])
  React.useEffect(() => {
    if (warnMessage) {
      setTimeout(() => {
        logWarn(null)
      }, NOTIFICATION_DURATION)
    }
  }, [warnMessage])

  React.useEffect(() => {
    if (error) {
      setTimeout(() => {
        logError(null)
      }, NOTIFICATION_DURATION)
    }
  }, [error])
  const contextPayload = React.useMemo(
    () => ({
      logError,
      logSuccess,
      logWarn,
    }),
    [logError, logSuccess, logWarn]
  )

  return (
    <AppNotificationContext.Provider value={contextPayload}>
      <Snackbar
        open={!!error?.message}
        autoHideDuration={NOTIFICATION_DURATION}
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        onClose={() => logError(null)}
      >
        <Alert elevation={6} variant="filled" severity="error">
          {error?.message}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!warnMessage}
        autoHideDuration={NOTIFICATION_DURATION}
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        onClose={() => logWarn(null)}
      >
        <Alert elevation={6} variant="filled" severity="warning">
          {warnMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!success}
        autoHideDuration={NOTIFICATION_DURATION}
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        onClose={() => logSuccess(null)}
      >
        <Alert elevation={6} variant="filled" severity="success">
          {success}
        </Alert>
      </Snackbar>
      {children}
    </AppNotificationContext.Provider>
  )
}

// A custom hook to quickly read the context's value. It's
// only here to allow quick imports
const useAppNotificationContext = () => React.useContext(AppNotificationContext)

export default AppNotificationProvider
export {
  useAppNotificationContext
}