import { useMemo, useState } from "react";

function Split ({members}){

    const total = useMemo(()=> {
        return members.reduce((s,m)=> s+m.given, 0);
        }, [members]);
    
    const surplus = useMemo(()=>{
        return members.reduce((s,m)=> {
            if (m.given- m.haveToGive >0 ){
                s[m.name]  = m.given-m.haveToGive;
                return s;
            }
            else return s;
        }, {})
    }, [members]);

    const deficit = useMemo(()=>{
        return members.reduce((s,m)=> {
            if (m.given- m.haveToGive <0 ){
                s[m.name]  = m.haveToGive - m.given;
                return s;
            }
            else return s;
        }, {})
    }, [members]);

    //const final = useMemo(()=>{  })








  




  
    
    return (
       
        <div>
            <p>Total: {total}</p>
            <ul>
               { Object.entries(surplus).map(([key, value]) => (
                <li key={key}>
                    {key}: {value}
                </li>
                )) }
               
            </ul>
            <ul>
                {Object.entries(deficit).map(([key, value]) => (
                <li key={key}>
                    {key}: {value}
                </li>
                ))}
            </ul>
        </div>
       

    );
}

export default Split