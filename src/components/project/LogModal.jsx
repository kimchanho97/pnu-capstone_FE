import cn from "classnames";
import { useAtomValue } from "jotai";
import React, { useEffect, useRef, useState } from "react";
import { BsReverseListColumnsReverse } from "react-icons/bs";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useQuery } from "react-query";
import { fetchProjectLogs } from "../../apis/project";
import useModal from "../../hooks/useModal";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { modalAtom } from "../../store";

export default function LogModal() {
  const modal = useAtomValue(modalAtom);
  const modalRef = useRef(null);
  const modalWrapperRef = useRef(null);
  const { closeModal } = useModal();
  const [option, setOption] = useState("buildLog");

  const { isLoading, data: logs } = useQuery(["/logs", modal?.props?.id], () =>
    fetchProjectLogs(modal?.props?.id),
  );

  const handleOnChangeOption = (e) => {
    setOption(e.target.value);
  };

  useOnClickOutside(modalRef, modalWrapperRef, closeModal);

  useEffect(() => {
    if (logs) {
      console.log(logs);
    }
  }, [logs]);

  return (
    <div
      className=" fixed top-0 left-0 w-screen h-screen bg-[rgba(31,41,55,0.2)] flex justify-end z-10"
      ref={modalWrapperRef}
    >
      <div
        className=" h-screen rounded bg-white opacity-100 p-1"
        style={{
          width: `calc(100vw - 500px)`,
        }}
        ref={modalRef}
      >
        <div className=" flex flex-col p-[1px] h-full gap-1">
          <div className=" h-[40px] flex items-center px-2 justify-between">
            <div className=" flex gap-3 items-center text-sm">
              <span>
                <BsReverseListColumnsReverse />
              </span>
              <span>{modal?.props?.name}</span>
            </div>
            <div className=" flex gap-5 items-center text-xs">
              <div className=" flex items-center gap-1">
                <button
                  className={cn(
                    "  p-1 rounded px-2",
                    option === "buildLog" ? "bg-zinc-300" : "bg-zinc-100",
                  )}
                  value={"buildLog"}
                  onClick={handleOnChangeOption}
                >
                  빌드 로그
                </button>
                <button
                  className={cn(
                    "  p-1 rounded px-2",
                    option === "deployLog" ? "bg-zinc-300" : "bg-zinc-100",
                  )}
                  value={"deployLog"}
                  onClick={handleOnChangeOption}
                >
                  배포 로그
                </button>
              </div>
              <button onClick={closeModal}>
                <IoIosCloseCircleOutline size={18} />
              </button>
            </div>
          </div>

          <div
            className=" bg-zinc-800 w-full rounded p-2 overflow-y-auto text-zinc-50 tracking-tight text-sm whitespace-pre-wrap"
            style={{
              height: `calc(100vh - 45px)`,
            }}
          >
            {/* {`
[INFO] Scanning for projects... [INFO] [INFO] --------------------
[INFO] Scanning for projects... [INFO] [INFO] --------------------
[INFO] Building Sample Project 1.0-SNAPSHOT [INFO]
-------------------- [INFO] [INFO] ---
maven-resources-plugin:2.6:resources (default-resources) @
sample-project --- [INFO] Using 'UTF-8' encoding to copy filtered
resources. [INFO] Copying 1 resource [INFO] [INFO] ---
maven-compiler-plugin:3.1:compile (default-compile) @ sample-project
--- [INFO] Changes detected - recompiling the module! [INFO]
Compiling 10 source files to /path/to/project/target/classes [INFO]
-------------------------------------------------------------
[ERROR] COMPILATION ERROR : [INFO]
-------------------------------------------------------------
[ERROR] /path/to/project/src/main/java/com/example/App.java:[10,17]
';' expected [INFO] 1 error [INFO]
------------------------------------------------------------- [INFO]
[INFO] --- maven-surefire-plugin:2.12.4:test (default-test) @
sample-project --- [INFO] Surefire report directory:
/path/to/project/target/surefire-reports [INFO] [INFO]
------------------------------------------------------- [INFO] T E S
T S [INFO] -------------------------------------------------------
[INFO] Running com.example.AppTest [INFO] Tests run: 1, Failures: 0,
Errors: 0, Skipped: 0, Time elapsed: 0.002 s - in
com.example.AppTest [INFO] [INFO] --- maven-jar-plugin:2.4:jar
(default-jar) @ sample-project --- [INFO] Building jar:
/path/to/project/target/sample-project-1.0-SNAPSHOT.jar [INFO]
------------------------------------------------------------------------
[INFO] BUILD SUCCESS [INFO]
------------------------------------------------------------------------
[INFO] Total time: 2.345 s [INFO] Finished at:
2024-06-02T12:34:56+00:00 [INFO] Final Memory: 20M/200M [INFO]
------------------------------------------------------------------------
[INFO] Building Sample Project 1.0-SNAPSHOT [INFO]
-------------------- [INFO] [INFO] ---
maven-resources-plugin:2.6:resources (default-resources) @
sample-project --- [INFO] Using 'UTF-8' encoding to copy filtered
resources. [INFO] Copying 1 resource [INFO] [INFO] ---
maven-compiler-plugin:3.1:compile (default-compile) @ sample-project
--- [INFO] Changes detected - recompiling the module! [INFO]
Compiling 10 source files to /path/to/project/target/classes [INFO]
-------------------------------------------------------------
[ERROR] COMPILATION ERROR : [INFO]
-------------------------------------------------------------
[ERROR] /path/to/project/src/main/java/com/example/App.java:[10,17]
';' expected [INFO] 1 error [INFO]
------------------------------------------------------------- [INFO]
[INFO] --- maven-surefire-plugin:2.12.4:test (default-test) @
sample-project --- [INFO] Surefire report directory:
/path/to/project/target/surefire-reports [INFO] [INFO]
------------------------------------------------------- [INFO] T E S
T S [INFO] -------------------------------------------------------
[INFO] Running com.example.AppTest [INFO] Tests run: 1, Failures: 0,
Errors: 0, Skipped: 0, Time elapsed: 0.002 s - in
com.example.AppTest [INFO] [INFO] --- maven-jar-plugin:2.4:jar
(default-jar) @ sample-project --- [INFO] Building jar:
/path/to/project/target/sample-project-1.0-SNAPSHOT.jar [INFO]
------------------------------------------------------------------------
[INFO] BUILD SUCCESS [INFO]
------------------------------------------------------------------------
[INFO] Total time: 2.345 s [INFO] Finished at:
2024-06-02T12:34:56+00:00 [INFO] Final Memory: 20M/200M [INFO]
------------------------------------------------------------------------`} */}
            {logs?.[option]}
          </div>
        </div>
      </div>
    </div>
  );
}
