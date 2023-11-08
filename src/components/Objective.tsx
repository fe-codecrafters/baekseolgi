import { useGetObjective } from "@/features/objective/api/getObjective";
import { useUpdateObjective } from "@/features/objective/api/updateObjective";
import { objectiveKeys } from "@/features/objective/key";
import EditIcon from "@/icons/EditIcon";
// import { RootState } from "@/redux/store";
// import { useSelector } from "react-redux";
import {
  ChangeEventHandler,
  FormEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";

interface Props {
  id: number;
}

export function Objective({ id }: Props) {
  const RQKey = objectiveKeys.id({ id });

  const { isSuccess, data } = useGetObjective(RQKey);
  const update = useUpdateObjective(RQKey);

  // TODO: client global state가 필요한지 확인 필요
  // const dataState = useSelector((state: RootState) => state.data);

  const [title, setTitle] = useState("");
  const [canEdit, setEdit] = useState(false);

  useEffect(() => {
    isSuccess && setTitle(data.title);
  }, [isSuccess]);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (canEdit) {
      update.mutate({
        data: {
          title,
          description: "",
        },
        id,
      });
      setEdit(false);
    }
  };

  const handleEdit: MouseEventHandler = (e) => {
    e.preventDefault();
    if (canEdit) {
      update.mutate({
        data: {
          title,
          description: "",
        },
        id,
      });
    }
    setEdit(!canEdit);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setTitle(event.target.value);
  };

  const inputDefaultCN =
    "w-full text-center bg-transparent disabled:bg-transparent";
  const inputCN = canEdit ? " text-primary-gray" : " text-primary-black";

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-[80px] w-[340px] flex-col items-center rounded-[20px] border border-primary-gray text-[16px] md:h-[120px] md:w-[600px] md:text-[24px]"
    >
      <div className="flex h-[48px] w-full items-center justify-end pr-[36px] md:h-[68px]">
        <div className="mr-[110px] md:mr-[222px]">목표</div>
        <button onClick={handleEdit}>
          <EditIcon />
        </button>
      </div>
      <input
        className={inputDefaultCN + inputCN}
        onChange={handleChange}
        type={"text"}
        required={true}
        value={title}
        disabled={!canEdit}
        readOnly={!canEdit}
      />
    </form>
  );
}
