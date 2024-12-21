import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { store } from './redux/index.js'
import { Provider } from 'react-redux'
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
//import Main from './pages/Main/Main.tsx'
import AboutMe from './pages/AboutMe/AboutMe.tsx'
import Setting from './pages/Setting/Setting.tsx'
import Messages from './pages/Messages/Messages.tsx'
import Friends from './pages/Friends/Friends.tsx'
import MyFriends from './Component/MyFriends/MyFriends.tsx'
import SearchFriends from './Component/SearchFriends/SearchFriends.tsx'

  const router = createBrowserRouter([
    {
      path: "/",
      element:   <App />,
      children:[
        {
          path: "about-me",
          element: <AboutMe />,
        },
        {
          path: "setting",
          element: <Setting />,
        },
        {
          path: "messages",
          element: <Messages/>,
        },
        {
          path: "friends",
          element: <Friends/>,
          children:[
            {
              path: "my-friends",
              element: <MyFriends />,
            },
            {
              path: "search-friends",
              element: <SearchFriends/>,
            },
          ]
        },
      ]
    },
  ]);
  
  

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
)
