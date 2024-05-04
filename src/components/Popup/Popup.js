import "../../index.css"
import { BsPersonStanding } from "react-icons/bs";
import { BsBarChartSteps } from "react-icons/bs";
import { BsPersonWalking } from "react-icons/bs";
import { BsCarFrontFill } from "react-icons/bs";

export default function PopupInfo(props){
    function Icon(val){
        val=val.counts;
        // console.log("valz: ", val);
      if(val>=900){
        return (
            <div className="flex flex-row items-center mt-[-1em]">
                <BsBarChartSteps style={{width: '1.2em', height: '1.2em'}} className="mr-4"/>
                <p className="text-base">Walking...</p>
            </div>
        );
      }
      else if(val>=200){
        return (
            <div className="flex flex-row items-center mt-[-1em]">
                <BsPersonWalking style={{width: '1.2em', height: '1.2em'}} className="mr-4"/>
                <p className="text-base">Running !</p>
            </div>
        );
      }
      else if(val>=10){
        return (
            <div className="flex flex-row items-center mt-[-1em]">
                <BsCarFrontFill style={{width: '1.2em', height: '1.2em'}} className="mr-4"/>
                <p className="text-base">`Driving`</p>
            </div>
        );
      }
      else{
        return (
            <div className="flex flex-row items-center mt-[-1em]">
                <BsPersonStanding style={{width: '1.2em', height: '1.2em'}} className="mr-4"/>
                <p className="text-base">Stationary.</p>
            </div>
        );
      }
    }
    return (
        <div className="flex flex-row basis-10/12 md:basis-5/12 lg:basis-3/12 xl:basis-2/12 m-0 ">
          <div className="w-full rounded-lg dark:bg-neutral-700 items-center ">
            <p className="text-base text-neutral-600 dark:text-neutral-200 bold-300" >
              Location:
            </p>
            
            <h5 className="text-xs mt-[-16px] font-medium leading-tight text-neutral-800 dark:text-neutral-50">
              ({props.latitude}, {props.longitude})
            </h5>
            <div style={{borderTop: '1px solid rgb(50,50,50,0.3)', width: '100%', height: '0%', margin: '6px 0px'}}></div>

            <p className="text-base text-neutral-600 dark:text-neutral-200">
              Pace: {props?.pace}
            </p>
            <div style={{borderTop: '1px solid rgb(50,50,50,0.3)', width: '100%', height: '0%', margin: '6px 0px'}}></div>

              <Icon counts={props?.counts} />

          </div>
        </div>
    );
}