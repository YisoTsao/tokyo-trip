import {
  createContext,
  useCallback,
  useContext,
  useRef,
  type ReactNode,
} from "react";
import { mapDialogs } from "../data/maps";
import type { MapDialogData, MapId } from "../data/types";
import { Icon } from "../illustrations/journal/icons";
import { RichText } from "./RichText";

const OpenMapContext = createContext<(id: MapId) => void>(() => {});
export const useMapDialog = () => useContext(OpenMapContext);

const close = (d: HTMLDialogElement) =>
  d.close ? d.close() : d.removeAttribute("open");
const closeFrom = (el: HTMLElement) => close(el.closest("dialog")!);
const backdropClose = (e: React.MouseEvent<HTMLDialogElement>) => {
  if (e.target === e.currentTarget) close(e.currentTarget);
};

type DialogProps = {
  data: MapDialogData;
  register: (el: HTMLDialogElement | null) => void;
};

function MapDialog({ data, register }: DialogProps) {
  const images = data.images.map((img) => (
    <img
      key={img.src}
      src={img.src}
      alt={img.alt}
      width={img.width}
      height={img.height}
    />
  ));
  return (
    <dialog
      ref={register}
      className="map-dialog"
      id={data.id}
      aria-labelledby={`${data.id}-t`}
      onClick={backdropClose}
    >
      <div className="mh">
        <h3 id={`${data.id}-t`}>{data.title}</h3>
        <button
          type="button"
          className="x"
          onClick={(e) => closeFrom(e.currentTarget)}
        >
          關閉
        </button>
      </div>
      <div className="mb">
        {data.pins.map((p, i) => (
          <div className="pin" key={i}>
            <span>{p.icon}</span>
            <span>
              <RichText value={p.rich} />
            </span>
          </div>
        ))}
        {data.pair ? (
          <div className="maps2">
            {images.map((img) => (
              <figure key={img.key}>{img}</figure>
            ))}
          </div>
        ) : (
          images
        )}
      </div>
    </dialog>
  );
}

/** Journal styling: drawn pin icons instead of emoji. */
function JournalMapDialog({ data, register }: DialogProps) {
  return (
    <dialog
      ref={register}
      className="j-dialog"
      id={data.id}
      aria-labelledby={`${data.id}-t`}
      onClick={backdropClose}
    >
      <div className="j-dialog__head">
        <h2 id={`${data.id}-t`}>{data.title}</h2>
        <button
          type="button"
          className="j-btn j-btn--ghost"
          onClick={(e) => closeFrom(e.currentTarget)}
        >
          關閉
        </button>
      </div>
      <div className="j-dialog__body">
        {data.pins.map((p, i) => (
          <div className="j-dialog__pin" key={i}>
            <Icon name="pin" size={18} />
            <span>
              <RichText value={p.rich} />
            </span>
          </div>
        ))}
        <div
          className={`j-dialog__maps${data.pair ? " j-dialog__maps--pair" : ""}`}
        >
          {data.images.map((img) => (
            <img
              key={img.src}
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </dialog>
  );
}

/** Renders the bus-stop map dialogs once and lets any timeline button open them by id. */
export function MapDialogProvider({
  children,
  journal,
}: {
  children: ReactNode;
  journal?: boolean;
}) {
  const refs = useRef<Partial<Record<MapId, HTMLDialogElement | null>>>({});
  const open = useCallback((id: MapId) => {
    const d = refs.current[id];
    if (d && d.showModal) d.showModal();
    else if (d) d.setAttribute("open", "");
  }, []);
  const Dialog = journal ? JournalMapDialog : MapDialog;
  return (
    <OpenMapContext.Provider value={open}>
      {children}
      {mapDialogs.map((m) => (
        <Dialog
          key={m.id}
          data={m}
          register={(el) => (refs.current[m.id] = el)}
        />
      ))}
    </OpenMapContext.Provider>
  );
}
