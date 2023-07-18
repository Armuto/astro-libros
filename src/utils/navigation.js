const checkIsNavigationSupported=()=>{
    return Boolean(document.startViewTransition);
}

const fetchPage=async(url)=>{
    const response=await fetch(url);
    const text=await response.text();
    const [,data]=text.match(/<body>([\s\S]*)<\/body>/i);

    return data;
}

export const startViewTransition=()=>{
    if(!checkIsNavigationSupported())return

    // if(document.startViewTransition){
    //     window.navigation.addEventListener('navigate',(event)=>{
    //       console.log(event.destination.url);
    //       const toUrl=new URL(event.destination.url);
    //       if(location.origin !== toUrl.origin)return
    
    //       event.intercept({
    //         async handler(){
    //             const response=await fetch(toUrl.pathname);
    //             const text=await response.text();
    
    //             const [,data]=text.match(/<body>([\s\S]*)<\/body>/i);
    //             document.startViewTransition(()=>{
    
    //                 document.body.innerHTML=data;
    //                 document.documentElement.scrollTop=0;
    
    //             })
    //         }
    //       })
    //     })
    // }
    window.navigation.addEventListener('navigate',(event)=>{
      console.log(event.destination.url);
      const toUrl=new URL(event.destination.url);
      if(location.origin !== toUrl.origin)return
        
      event.intercept({
        async handler(){
            const data=await fetchPage(toUrl.pathname);
            document.startViewTransition(()=>{
                document.body.innerHTML=data;
                document.documentElement.scrollTop=0;
        
            })
        }
      })
    })
}