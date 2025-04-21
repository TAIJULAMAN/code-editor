import { CiFaceSmile } from 'react-icons/ci';
import { LuSend } from 'react-icons/lu';
import { TbMoodSad } from 'react-icons/tb';

function MessageSec() {
  return (
    <div>
      <div className="bg-slate-800 border border-slate-700 grid grid-cols-6 gap-2 rounded-xl p-2 text-sm">
        <h1 className="text-center text-slate-600 text-xl font-bold col-span-6">
          Send Feedback
        </h1>
        <textarea
          className="bg-slate-700 text-slate-300 h-28 placeholder:text-slate-300 placeholder:opacity-50 border border-slate-600 col-span-6 resize-none outline-none rounded-lg p-2 duration-300 focus:border-slate-300"
          placeholder="Your feedback..."
        ></textarea>
        <button className="fill-slate-300 col-span-1 flex justify-center items-center rounded-lg p-2 duration-300 bg-slate-700 hover:border-slate-300 focus:fill-blue-200 border border-slate-600">
          <CiFaceSmile />
        </button>
        <button className="fill-slate-300 col-span-1 flex justify-center items-center rounded-lg p-2 duration-300 bg-slate-700 hover:border-slate-300 focus:fill-blue-200 border border-slate-600">
          <TbMoodSad />
        </button>
        <span className="col-span-2"></span>
        <button className="col-span-2 stroke-slate-300 bg-slate-700 focus:stroke-blue-200 border border-slate-600 hover:border-slate-300 rounded-lg p-2 duration-300 flex justify-center items-center">
          <LuSend />
        </button>
      </div>
    </div>
  );
}

export default MessageSec;
