import React from 'react'
import { Unity, useUnityContext } from "react-unity-webgl";
import NavbarMeta from '../components/NavbarMeta'

const Meta = () => {

  
      const { unityProvider } = useUnityContext({
                                                  loaderUrl: "build/Web Gl Out.loader.js",
                                                  dataUrl: "build/Web Gl Out.data",
                                                  frameworkUrl: "build/Web Gl Out.framework.js",
                                                  codeUrl: "build/Web Gl Out.wasm",
                                                });

      return (
      <><NavbarMeta/>
      <Unity unityProvider={unityProvider} style={{alignContent:'center', textAlign:'center', alignItems:'center' , width:'100%' , height:'100%' }} />;
      </>)
  
}

export default Meta

// src/unity/Web Gl Out/Build/Web Gl Out.data
// Web Gl Out.wasm
// src/unity/Web-Gl-Out/Build/Web Gl Out.data