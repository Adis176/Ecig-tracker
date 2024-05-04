import "../../index.css";
import { BsPersonStanding } from "react-icons/bs";
import { BsBarChartSteps } from "react-icons/bs";
import { BsPersonWalking } from "react-icons/bs";
import { BsCarFrontFill } from "react-icons/bs";
export default function Card({props}){
  function Icon(val){
    if(val == 2){
      return (
          <div className="flex flex-row">
              <BsBarChartSteps />
              <p>Walking...</p>
          </div>
      );
    }
    else if(val == 3){
      return (
          <div className="flex flex-row">
              <BsPersonWalking />
              <p>Running !</p>
          </div>
      );
    }
    else if(val == 4){
      return (
          <div className="flex flex-row">
              <BsCarFrontFill />
              <p>`Driving`</p>
          </div>
      );
    }
    else{
      return (
          <div className="flex flex-row">
              <BsPersonStanding />
              <p>Stationary.</p>
          </div>
      );
    }
  }
    return (
        <div className="flex flex-row basis-10/12 md:basis-5/12 lg:basis-3/12 xl:basis-2/12 m-0 ">
          <div
          className="w-full rounded-lg p-2  dark:bg-neutral-700 items-center ">
            <h5
              className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
              Card title
            </h5>
            <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
              Some quick eg
            </p>
            <button
              type="button"
              className="flex mx-auto rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] bg-red-700">
              Button
            </button>
            <div>
              <Icon val={props?.val} /> 
            </div>
          </div>
        </div>
    );
}