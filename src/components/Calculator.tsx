import { FormEvent, useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { nanoid } from "nanoid";

interface Equation {
    firstNumber: string;
    secondNumber: string;
    operation: string;
    output: number | string;
}

const Calculator = () => {
    const OPERATION = {
        ADDITION: "addition",
        SUBTRACTION: "subtraction",
        MULTIPLICATION: "multiplication",
        DIVISION: "division",
    };
    const [equation, setEquation] = useState({
        firstNumber: "",
        secondNumber: "",
        operation: "",
        output: "",
    } as Equation);
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const output = calculate(Number(equation.firstNumber), Number(equation.secondNumber), equation.operation);
        const id = nanoid();
        await setDoc(doc(db, "calculations", id), { ...equation, output });
        setEquation((prevEquation) => ({ ...prevEquation, output }));
    };
    const handleChange = async (e: FormEvent<HTMLInputElement>) => {
        const { name: key, value } = e.currentTarget;

        setEquation((prevEquation) => ({ ...prevEquation, [key]: value }));
    };
    const calculate = (firstNumber: number, secondNumber: number, operation: string): number | string => {
        switch (operation) {
            case OPERATION.ADDITION:
                return firstNumber + secondNumber;
            case OPERATION.SUBTRACTION:
                return firstNumber - secondNumber;
            case OPERATION.MULTIPLICATION:
                return firstNumber * secondNumber;
            case OPERATION.DIVISION:
                if (secondNumber === 0) return "Nie można dzielić przez 0";
                return firstNumber / secondNumber;
            default:
                return "";
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input value={equation.firstNumber} onChange={handleChange} name='firstNumber' type={"number"} />
                <input value={equation.secondNumber} onChange={handleChange} name='secondNumber' type={"number"} />
                <input
                    onChange={handleChange}
                    id='addition'
                    name='operation'
                    value='addition'
                    type='radio'
                    checked={equation.operation === "addition"}
                    required
                />
                <label htmlFor='addition'>Dodaj</label>

                <input
                    onChange={handleChange}
                    id='subtraction'
                    name='operation'
                    value='subtraction'
                    type='radio'
                    checked={equation.operation === "subtraction"}
                    required
                />
                <label htmlFor='subtraction'>Odejmij</label>

                <input
                    onChange={handleChange}
                    id='multiplication'
                    name='operation'
                    value='multiplication'
                    type='radio'
                    checked={equation.operation === "multiplication"}
                    required
                />
                <label htmlFor='multiplication'>Pomnóż</label>

                <input
                    onChange={handleChange}
                    id='division'
                    name='operation'
                    value='division'
                    type='radio'
                    checked={equation.operation === "division"}
                    required
                />
                <label htmlFor='division'>Podziel</label>
                <button type='submit'>Oblicz</button>
            </form>
            Wynik to: {equation.output}
        </div>
    );
};

export default Calculator;
