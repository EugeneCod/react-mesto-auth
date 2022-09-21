import React from 'react'

function ErrorPage() {
  return (
    <div className='error-page'>
      <p className='error-page__error-code'>404</p>
      <p className='error-page__message'>Страница не найдена!</p>
    </div>
  )
}

export default ErrorPage