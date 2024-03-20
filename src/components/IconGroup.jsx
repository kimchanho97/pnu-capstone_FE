import React from "react";
import { FaJava, FaNodeJs, FaPython, FaReact, FaVuejs } from "react-icons/fa";
import {
  SiSpringboot,
  SiSpring,
  SiFlask,
  SiNextdotjs,
  SiSvelte,
  SiMysql,
} from "react-icons/si";
import { SiMariadbfoundation } from "react-icons/si";

export default function IconGroup() {
  return (
    <div className=" text-zinc-500 flex gap-3 mt-20">
      <FaPython />
      <FaJava />
      <FaNodeJs />
      <FaReact />
      <FaVuejs />
      <SiSvelte />
      <SiNextdotjs />
      <SiSpring />
      <SiSpringboot />
      <SiFlask />
      <SiMariadbfoundation />
      <SiMysql />
    </div>
  );
}
