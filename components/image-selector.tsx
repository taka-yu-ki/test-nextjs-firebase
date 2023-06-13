import { Dialog, Transition } from "@headlessui/react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { ChangeEvent, Fragment, useCallback, useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { useDropzone } from "react-dropzone";
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

const ImageSelector = <T extends FieldValues>({
  control,
  name,
}: UseControllerProps<T>) => {
  const [selectedImage, setSelectedImage] = useState<File | null>();
  const [scale, setScale] = useState<number>(1.5);
  const ref = useRef<AvatarEditor>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { field } = useController({
    name,
    control,
  });

  // useCallbackはUserFormが呼ばれた１回目のみ実行される。(第２引数が空の時)
  const onDropAccepted = useCallback((acceptedFiles: File[]) => {
    setSelectedImage(acceptedFiles[0]);
    setIsModalOpen(true);
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // プロフィール画像に入れるデータの種類を指定している
  const { getRootProps, getInputProps, isDragAccept } = useDropzone({
    onDropAccepted,
    accept: {
      "image/png": [],
      "image/jpeg": [],
    },
  });

  // input type="range"で変更した画像スケールのデータを渡すための処理
  const hundleScaleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setScale(parseFloat(e.target.value));
  };

  const getCroppedImage = () => {
    const image = ref.current?.getImage();
    const canvas = document.createElement("canvas");
    canvas.width = 80;
    canvas.height = 80;

    const ctx = canvas.getContext("2d");
    ctx?.drawImage(image!, 0, 0, 80, 80);

    field.onChange(canvas.toDataURL("image/png"));

    closeModal();
  };

  return (
    <div>
      <div
        className={classNames(
          "aspect-square relative rounded-full overflow-hidden w-40 grid hover:cursor-pointer hover:bg-blue-100 content-center border-dashed border-slate-300 border-2",
          isDragAccept && "bg-blue-100"
        )}
        {...getRootProps()}
      >
        {field.value && (
          <img
            src={field.value as string}
            className="absolute top-0 left-0 w-full h-full block"
            alt=""
          />
        )}
        <div className="text-center z-5 relative">
          <PhotoIcon className="w-10 h-10 mx-auto text-slate-400" />
          <p className="text-slate-400 text-sm">画像を選択</p>
        </div>
        <input className="hidden" {...getInputProps} />
      </div>

      {field.value && (
        <button
          className="text-slate-600 text-sm"
          onClick={() => field.onChange("")}
        >
          削除
        </button>
      )}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  {selectedImage && (
                    <div>
                      <AvatarEditor
                        ref={ref}
                        image={selectedImage}
                        width={250}
                        height={250}
                        border={50}
                        borderRadius={125}
                        color={[255, 255, 255, 0.6]} // RGBA
                        scale={scale}
                        rotate={0}
                      />
                      <input
                        type="range"
                        min={1}
                        max={2}
                        step={0.1}
                        defaultValue={1.5}
                        onChange={hundleScaleChange}
                      />
                    </div>
                  )}
                  <div className="flex space-x-2 justify-end">
                    <button
                      className="px-3 py-2 rounded-full bg-slate-100"
                      onClick={closeModal}
                    >
                      閉じる
                    </button>
                    <button
                      onClick={getCroppedImage}
                      className="px-3 py-2 rounded-full bg-blue-500 text-white"
                    >
                      保存
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ImageSelector;
