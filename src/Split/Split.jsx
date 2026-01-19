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


    const final = useMemo(()=>{
        let info = [];
        let Scnt=0;
        let Dcnt=0;
        while (Scnt< Object.keys(surplus).length){

            let s = Object.entries(surplus)[Scnt];
            while (s[1] >0){
                let d = Object.entries(deficit)[Dcnt];
                if (s[1]> d[1]){
                    info.push(`${d[0]} needs to pay ${s[0]} : ${d[1].toFixed(2)}`)
                    s[1]-= d[1];
                    d[1]=0; Dcnt++;
                    
                }
                else if (d[1]>=s[1]){
                    info.push(`${d[0]} needs to pay ${s[0]} : ${s[1].toFixed(2)}`)
                    d[1]-= s[1];
                    s[1]=0; Scnt++;
                }
            }
        }
        return info;
    },[surplus,deficit])



    




    return (
       
        <div>
            <p>Total expense: {total.toFixed(2)}</p>
            {final.map((i, index) => <p key={index}>{i} </p>)}
        </div>
       

    );
}

export default Split