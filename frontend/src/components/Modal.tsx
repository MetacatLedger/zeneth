import { useRef, useEffect } from 'react';
import { useOutsideAlerter } from 'hooks/OutsideAlerter';
import { createContext, useState, ReactNode } from 'react';
import { TokenList } from 'types';

type ContextProps = {
  visible: boolean;
  content: ReactNode;
  clearModal: () => void;
  setModal: ({ content, styleClass }: { content: ReactNode; styleClass: string }) => void;
  tokenList: TokenList;
};

export const ModalContext = createContext<ContextProps>({
  visible: false,
  content: <div></div>,
  clearModal: () => undefined,
  setModal: () => undefined,
  tokenList: [],
});

export const WithModal = ({ children }: { children: ReactNode }) => {
  const [visible, setModalVisible] = useState(false);
  const [content, setModalContent] = useState<ReactNode>();
  const [styleClass, setStyleClass] = useState('');
  const [tokenList, setTokenList] = useState([]);
  const clearModal = () => {
    setModalVisible(false);
    setModalContent(<div></div>);
  };
  const setModal = ({ content, styleClass }: { content: ReactNode; styleClass: string }) => {
    setModalVisible(true);
    setModalContent(content);
    setStyleClass(styleClass);
  };
  useEffect(() => {
    async function getTokenList() {
      const response = await fetch(
        'https://raw.githubusercontent.com/Uniswap/default-token-list/master/src/tokens/mainnet.json'
      ).then((r) => r.json());
      console.log(response);
      setTokenList(response);
    }
    getTokenList();
  }, []);

  return (
    <ModalContext.Provider
      value={{
        visible,
        content,
        clearModal,
        setModal,
        tokenList,
      }}
    >
      <div className={!visible ? 'hidden' : ''}>
        <Modal styleClass={styleClass}>{content}</Modal>
      </div>
      {children}
    </ModalContext.Provider>
  );
};

export const Modal = ({ children, styleClass = 'w-1/2' }: { children: ReactNode; styleClass: string }) => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  return (
    <div className="fixed flex justify-center items-center inset-0 w-full h-full z-20 bg-black bg-opacity-50 duration-300 overflow-y-auto">
      <div ref={wrapperRef} className={'mx-2 sm:mx-auto my-10 opacity-100 ' + styleClass}>
        <div className="bg-white shadow-lg rounded-md text-gray-900 z-20">{children}</div>
      </div>
    </div>
  );
};
