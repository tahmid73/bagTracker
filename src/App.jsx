import './input.css';
import React,{useState,useRef} from 'react';
import QRCode from 'qrcode';
import QrReader from 'react-qr-reader';
// import {Card} from '@material-ui/core';
// import PreviousMap from 'postcss/lib/previous-map';

function App() {

  const [imageUrl,setImageUrl]=useState("");
  const [data,setData]=useState({id:0,size:"",color:"",airline:"",flightNo:"",passengerName:""});
  const {size,color,airline,flightNo,passengerName}=data;
  const qrRef=useRef(null);
  const qrRefB=useRef(null);
  const [scanFileA,setScanFileA]=useState("");
  const [scanFileB,setScanFileB]=useState("");
  const [bagList,setBagList]=useState([]);
  const [camResultA,setCamResultA]=useState("");
  const [camResultB,setCamResultB]=useState("");
  const [counter,setCounter]=useState(0);

  function generateJson(e){
     let inputData={id:counter+1}
      setData({id:"",size:"",color:"",airline:"",flightNo:"",passengerName:""});
      // setCounter(counter+1);
      generateQr()
      setBagList(bagList,bagList.push({id:counter,size:data.size,color:data.color,airline:data.airline,flightNo:data.flightNo,passengerName:data.passengerName}));
      setCounter(counter+1);
      console.log(data);
      console.log(bagList);
      
  }

  const onScanFile=()=>{
    qrRef.current.openImageDialog();
  }
  const onScanFileB=()=>{
    qrRefB.current.openImageDialog();
  }

  const handleInput=(e)=>{
    let {name,value}=e.target;
    setData({
      ...data,[
        name
      ]:value
    })
  }

  const handleErrorFile=(error)=>{
    console.log(error);
  }

  const handleScanFile=(result)=>{
    if(result){
      setScanFileA(JSON.parse(result));
    }
  }
  const handleScanFileB=(result)=>{
    if(result){
      setScanFileB(JSON.parse(result));
    }
  }

  const generateQr=async()=>{
    try{
        const response =await QRCode.toDataURL(JSON.stringify({id:counter,size:data.size,color:data.color,airline:data.airline,flightNo:data.flightNo,passengerName:data.passengerName}));
        setImageUrl(response);
    }catch(error){
      console.log(error);
    }
  }

  const handleErrorCam=(error)=>{
    console.log(error);
  }

  const handleScanCamA=(result)=>{
    if(result){
      setCamResultA(JSON.parse(result));
    }
  }
  const handleScanCamB=(result)=>{
    if(result){
      setCamResultB(JSON.parse(result));
    }
  }
  const showCamA=(result)=>{
    setScanFileA(camResultA)
  }
  const showCamB=(result)=>{
    setScanFileB(camResultB)
  }

  navigator.getUserMedia({video:true}, function(stream) {
    stream.getTracks().forEach(x=>x.stop());
  }, err=>console.log(err));

  return (
    <div className='bg-blue-300 justify-center'>
      <div className='justify-center'>
        <h2 className='text-black'>
        Generate Download and Scan qr code
        </h2>
      </div>
      <div className='flex flex-row'>
      <div className="max-w-sm rounded overflow-hidden shadow-lg">

{/* inputs */}
      <div className='flex flex-col p-4'>
      <input type="text" placeholder='Color' value={color} name="color" onChange={handleInput} className="p-2 border-2 rounded-2xl mb-2"/>
      <input type="text" placeholder="Size" value={size} name="size" onChange={handleInput} className="p-2 border-2 rounded-2xl mb-2"/>
      <input type="text" placeholder='Airline' value={airline} name="airline" onChange={handleInput} className="p-2 border-2 rounded-2xl mb-2"/>
      <input type="text" placeholder='Flight No' value={flightNo} name="flightNo" onChange={handleInput} className="p-2 border-2 rounded-2xl mb-2"/>
      <input type="text" placeholder="Passenger Name" value={passengerName} name="passengerName" onChange={handleInput} className="p-2 border-2 rounded-2xl mb-2"/>
      <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={generateJson}>Generate</button>
      </div>
{/* generated qr code */}

     {imageUrl?(<a href={imageUrl} download><img src={imageUrl} alt="img" /></a>):null}
      </div>
      
      {/* <div className="max-w-sm rounded overflow-hidden shadow-lg p-10">
      <p>A point camera</p>
        <button onClick={onScanFile} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
        Scan QR code
        </button>
        <QrReader
          ref={qrRef}
          delay={300}
          onError={handleErrorFile}
          onScan={handleScanFile}
          legacyMode
        />
        {scanFileA?
        (<>
        <h3>Luggage {scanFileA.id} in A point</h3>
        <h3>Size:{scanFileA.size}</h3>
        <h3>Color:{scanFileA.color}</h3>
        <h3>Id:{scanFileA.id}</h3>
        </>):null
      }
        </div> */}
        {/* <div className='max-w-sm rounded overflow-hidden shadow-lg p-10'>
          <p>B point camera</p>
        <button onClick={onScanFileB} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
        Scan QR code
        </button>
        <QrReader
          ref={qrRefB}
          delay={300}
          onError={handleErrorFile}
          onScan={handleScanFileB}
          legacyMode
        />
        {scanFileB?
        (<>
        <h3>Luggage {scanFileB.id} in b point</h3>
        <h3>Size:{scanFileB.size}</h3>
        <h3>Color:{scanFileB.color}</h3>
        <h3>Id:{scanFileB.id}</h3>
        </>):null
      }
        </div> */}

{/* ******************* */}
{/* ******************* */}
{/* ******************* */}
{/* camera one in here  */}
{/* ******************* */}
{/* ******************* */}
{/* ******************* */}
        <div className="max-w-sm rounded overflow-hidden shadow-lg p-10">
      <p>A point camera</p>
        <button onClick={showCamA} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
        Scan QR code
        </button>
        <QrReader
        onError={handleErrorCam}
        onScan={handleScanCamA}
        />
        {scanFileA?
        (<>
        <h3>Luggage {scanFileA.id} in A point</h3>
        <h3>Size:{scanFileA.size}</h3>
        <h3>Color:{scanFileA.color}</h3>
        <h3>Id:{scanFileA.id}</h3>
        <h3>Airline:{scanFileA.airline}</h3>
        <h3>Flight No:{scanFileA.flightNo}</h3>
        <h3>Passenger Name:{scanFileA.passengerName}</h3>
        </>):null
      }
        </div>

{/* ******************* */}
{/* camera one in here  */}
{/* ******************* */}
        <div className='max-w-sm rounded overflow-hidden shadow-lg p-10'>
          <p>B point camera</p>
        <button onClick={showCamB} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
        Scan QR code
        </button>
        <QrReader
        onError={handleErrorCam}
        onScan={handleScanCamB}
        />
        {scanFileB?
        (<>
        <h3>Luggage {scanFileB.id} in A point</h3>
        <h3>Size:{scanFileB.size}</h3>
        <h3>Color:{scanFileB.color}</h3>
        <h3>Id:{scanFileB.id}</h3>
        <h3>Airline:{scanFileB.airline}</h3>
        <h3>Flight No:{scanFileB.flightNo}</h3>
        <h3>Passenger Name:{scanFileB.passengerName}</h3>
        </>):null
      }
        </div>

        
      </div>
      <table className='border-2 border-stone-800'>
        <tr>
            <td className='border-2 border-stone-800 p-2'>Id </td>
            <td className='border-2 border-stone-800 p-2'>Size </td>
            <td className='border-2 border-stone-800 p-2'>Color </td>
            <td className='border-2 border-stone-800 p-2'>Flight No </td>
            <td className='border-2 border-stone-800 p-2'>Airline</td>
            <td className='border-2 border-stone-800 p-2'>Passenger Name </td>
            {/* <td className='border-2 border-stone-800 p-2'>Status</td> */}
        </tr>
      {
        bagList.map(item=>(
          <tr key={item.id}>
                <td className='border-2 border-stone-800 p-2'>{item.id}</td>
                <td className='border-2 border-stone-800 p-2'>{item.size}</td>
                <td className='border-2 border-stone-800 p-2'>{item.color}</td>
                <td className='border-2 border-stone-800 p-2'>{item.flightNo}</td>
                <td className='border-2 border-stone-800 p-2'>{item.airline}</td>
                <td className='border-2 border-stone-800 p-2'>{item.passengerName}</td>
                {(() =>{
                  if(item.id===scanFileA.id){
                    return(
                      <td className='border-2 border-stone-800 p-2'>A</td>
                    )
                  }
                  else if(item.id===scanFileB.id){
                    return(
                      <td className='border-2 border-stone-800 p-2'>B</td>
                    )
                  }
                  else{
                    return(
                        <td className='border-2 border-stone-800 p-2'>Null</td>
                    )
                  }
                })}
          </tr>
        ))

      }
      </table>
       {/* { <div className='max-w-sm rounded overflow-hidden shadow-lg p-10'>
        <button onClick={showCamA}>ScanB</button>
        <QrReader
        onError={handleErrorCam}
        onScan={handleScanCamA}
        />
      </div> 
      }
      { <div className='max-w-sm rounded overflow-hidden shadow-lg p-10'>
        <button onClick={showCamB}>ScanB</button>
        <QrReader
        onError={handleErrorCam}
        onScan={handleScanCamB}
        />
      </div> 
      } */}
      </div>
  );
}

export default App;
