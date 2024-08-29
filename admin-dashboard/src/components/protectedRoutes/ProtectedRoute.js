import React from 'react'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ Comp }) {

  const token = localStorage.getItem("isLogin");

  if (token === "true" && token !== null) {
    return <Comp> </Comp>
  } else {
    return <Navigate to="/login" />
  }
}

