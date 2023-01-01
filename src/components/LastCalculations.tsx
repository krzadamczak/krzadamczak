import { useState, useEffect } from "react";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
interface Equation {
    firstNumber: string;
    secondNumber: string;
    operation: string;
    output: number | string;
}
const LastEquations = () => {
    const [equations, setEquations] = useState([] as Array<Equation>);
    useEffect(() => {
        const getFromDB = async () => {
            const querySnapshot = await getDocs(collection(db, "calculations"));
            const result = [] as Array<Equation>;
            querySnapshot.forEach((item) => {
                result.push(item.data() as Equation);
            });
            console.log(result);
            setEquations(result);
        };
        getFromDB();
    }, []);
    return (
        <div>
            {equations.length > 0 &&
                equations.map((equation, index) => {
                    return <p key={index}>{equation.output}</p>;
                })}
        </div>
    );
};

export default LastEquations;
