import React, { useState } from 'react'
import Layout from './pages/Layout'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import Category from './pages/CategoryPage/Category'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/category/:category" element={<Category />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
