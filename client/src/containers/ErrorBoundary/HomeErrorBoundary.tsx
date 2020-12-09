import React, { Component, ErrorInfo } from 'react'

interface HomeErrorBoundaryState {
  hasError: boolean
}
const initialHomeErrorBoundaryState: HomeErrorBoundaryState = {
  hasError: false,
}

class HomeErrorBoundary extends Component<any, HomeErrorBoundaryState> {
  state = initialHomeErrorBoundaryState

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log react render error
    console.log('Error boundary catch error', { error, errorInfo })
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}

export default HomeErrorBoundary
