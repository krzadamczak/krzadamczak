import { useState, useEffect } from "react";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Equation } from "../interfaces";
import { Operation } from "../operations";
import "./LastCalculations.css";

const LastEquations = () => {
    const wordToSymbol = (operation: string): string => {
        switch (operation) {
            case Operation.Addition:
                return "+";
            case Operation.Subtraction:
                return "-";
            case Operation.Division:
                return "/";
            case Operation.Multiplication:
                return "*";
            default:
                return operation;
        }
    };
    const [equations, setEquations] = useState([] as Array<Equation>);
    useEffect(() => {
        const getFromDB = async () => {
            const querySnapshot = await getDocs(collection(db, "calculations"));
            const result = [] as Array<Equation>;
            querySnapshot.forEach((item) => {
                result.push(item.data() as Equation);
            });

            result.sort((a, b) => b.createdAt - a.createdAt);
            setEquations(result);
        };
        getFromDB();
    }, []);
    return (
        <div className='last-calculations'>
            {equations.length > 0 &&
                equations.map((equation) => {
                    return (
                        <p key={equation.id}>
                            {`${equation.firstNumber} ${wordToSymbol(equation.operation)} ${equation.secondNumber} = ${
                                equation.output
                            }`}
                        </p>
                    );
                })}
        </div>
    );
};

export default LastEquations;
