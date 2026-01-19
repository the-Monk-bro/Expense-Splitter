import { useMemo } from "react";

function Split ({members}){
    const total = useMemo(()=> {
        return members.reduce((s,m)=> s+m.given, 0);
        }, [members]);

    return (
        <div>
            <p>Total: {total}</p>
        </div>
       

    );
}

export default Split