import { Button, TextInput } from "flowbite-react";
import React from "react";
import { useSelector } from "react-redux";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="text-center font-semibold text-3xl my-3">Profile</h1>
      <form className="flex flex-col gap-4">
        <div className="h-32 w-32 self-center cursor-pointer">
          <img
            src={currentUser?.rest?.profilePicture}
            alt=""
            className="w-full h-full rounded-full border-8 border-[lightgray]"
          />
        </div>
        <TextInput
          type="text"
          id="username"
          defaultValue={currentUser?.rest?.username}
        />
        <TextInput
          type="text"
          id="email"
          defaultValue={currentUser?.rest?.email}
        />
        <Button type="submit" gradientDuoTone={"purpleToPink"} outline>
          Update Account
        </Button>
        <div className="flex justify-between">
          <span className="text-red-500 cursor-pointer">Delete Account</span>
          <span className="text-red-500 cursor-pointer">Sign Out</span>
        </div>
      </form>
    </div>
  );
}
