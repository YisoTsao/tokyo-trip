import {
  createContext,
  useCallback,
  useContext,
  useRef,
  type ReactNode,
} from "react";
import { mapDialogs } from "../data/maps";
import type { MapDialogData, MapId } from "../data/types";
import { RichText } from "./RichText";

const OpenMapContext = createContext<(id: MapId) => void>(() => {});
export const useMapDialog = () => useContext(OpenMapContext);

function MapDialog({
  data,
  register,
}: {
  data: MapDialogData;
  register: (el: HTMLDialogElement | null) => void;
}) {
  const close = (d: HTMLDialogElement) =>
    d.close ? d.close() : d.removeAttribute("open");
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
      onClick={(e) => {
        if (e.target === e.currentTarget) close(e.currentTarget);
      }}
    >
      <div className="mh">
        <h3 id={`${data.id}-t`}>{data.title}</h3>
        <button
          type="button"
          className="x"
          onClick={(e) => close(e.currentTarget.closest("dialog")!)}
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

/** Renders the bus-stop map dialogs once and lets any timeline button open them by id. */
export function MapDialogProvider({ children }: { children: ReactNode }) {
  const refs = useRef<Partial<Record<MapId, HTMLDialogElement | null>>>({});
  const open = useCallback((id: MapId) => {
    const d = refs.current[id];
    if (d && d.showModal) d.showModal();
    else if (d) d.setAttribute("open", "");
  }, []);
  return (
    <OpenMapContext.Provider value={open}>
      {children}
      {mapDialogs.map((m) => (
        <MapDialog
          key={m.id}
          data={m}
          register={(el) => (refs.current[m.id] = el)}
        />
      ))}
    </OpenMapContext.Provider>
  );
}
