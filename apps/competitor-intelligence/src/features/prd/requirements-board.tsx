"use client";
/* eslint-disable react-hooks/refs -- dnd-kit exposes callback refs and live transform state as its documented sortable API. */

import { DndContext, KeyboardSensor, PointerSensor, TouchSensor, closestCorners, useDroppable, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Move, X } from "lucide-react";
import React, { useMemo, useState } from "react";
import type { EffectivePrdRecord } from "./local-draft";
import { PrdBadge } from "./prd-badges";
import { usePrd } from "./prd-provider";
import { deliveryStatuses, requirementCategories, type DeliveryStatus, type RequirementCategory } from "./types";
import styles from "./prd.module.css";

type BoardMode = "category" | "delivery";

function BoardCard({ record, onOpen, onMove }: { record: EffectivePrdRecord; onOpen: () => void; onMove: () => void }) {
  const sortable = useSortable({ id: record.id, data: { record } });
  return <article ref={sortable.setNodeRef} style={{ transform: CSS.Transform.toString(sortable.transform), transition: sortable.transition }} className={`${styles.boardCard} ${sortable.isDragging ? styles.dragging : ""}`}>
    <div className={styles.boardCardTop}><button type="button" className={styles.dragHandle} ref={sortable.setActivatorNodeRef} {...sortable.attributes} {...sortable.listeners} aria-label={`Drag ${record.id}`}><GripVertical size={16} /></button><span>{record.id}</span><button type="button" aria-label={`Move ${record.id}`} onClick={onMove}><Move size={14} /></button></div>
    <button type="button" className={styles.boardCardBody} onClick={onOpen}><small>{record.module} / {record.screen}</small><strong>{record.title}</strong><p>{record.proposedChange}</p></button>
    <footer><PrdBadge kind="decision" value={record.decisionStatus} /><span>{record.planningEta ?? "Unscheduled"}</span></footer>
  </article>;
}

function Lane({ id, label, records, onOpen, onMove }: { id: string; label: string; records: EffectivePrdRecord[]; onOpen: (record: EffectivePrdRecord) => void; onMove: (record: EffectivePrdRecord) => void }) {
  const { setNodeRef, isOver } = useDroppable({ id: `lane:${id}`, data: { lane: id } });
  return <section ref={setNodeRef} role="region" aria-label={label} className={`${styles.boardLane} ${isOver ? styles.laneOver : ""}`}><header><span>{label}</span><b>{records.length}</b></header><SortableContext items={records.map((item) => item.id)} strategy={verticalListSortingStrategy}><div className={styles.boardLaneBody}>{records.map((record) => <BoardCard key={record.id} record={record} onOpen={() => onOpen(record)} onMove={() => onMove(record)} />)}{!records.length ? <p>Drop a requirement here</p> : null}</div></SortableContext></section>;
}

export function RequirementsBoard({ records, mode, onOpen }: { records: EffectivePrdRecord[]; mode: BoardMode; onOpen: (record: EffectivePrdRecord) => void }) {
  const { moveRecord } = usePrd();
  const [optimistic, setOptimistic] = useState<Record<string, { category?: RequirementCategory; deliveryStatus?: DeliveryStatus }>>({});
  const [moving, setMoving] = useState<EffectivePrdRecord | null>(null);
  const [target, setTarget] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }), useSensor(TouchSensor, { activationConstraint: { delay: 160, tolerance: 8 } }), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));
  const effective = useMemo(() => records.map((record) => ({ ...record, ...optimistic[record.id] })), [records, optimistic]);
  const lanes = mode === "category" ? requirementCategories : deliveryStatuses;
  const valueFor = (record: EffectivePrdRecord) => mode === "category" ? record.category : record.deliveryStatus;
  const commitMove = (record: EffectivePrdRecord, lane: string) => {
    if (mode === "category") { const category = lane as RequirementCategory; moveRecord(record.id, { category, index: 0 }); setOptimistic((current) => ({ ...current, [record.id]: { ...current[record.id], category } })); }
    else { const deliveryStatus = lane as DeliveryStatus; moveRecord(record.id, { deliveryStatus, index: 0 }); setOptimistic((current) => ({ ...current, [record.id]: { ...current[record.id], deliveryStatus } })); }
    setAnnouncement(`${record.id} moved to ${lane}`);
  };
  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) return;
    const record = effective.find((item) => item.id === active.id);
    if (!record) return;
    const lane = String(over.id).startsWith("lane:") ? String(over.id).slice(5) : valueFor(effective.find((item) => item.id === over.id) ?? record);
    commitMove(record, lane);
  };
  return <>
    <div className={styles.srOnly} aria-live="polite">{announcement}</div>
    <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={onDragEnd}><div className={styles.board}>{lanes.map((lane) => <Lane key={lane} id={lane} label={lane} records={effective.filter((record) => valueFor(record) === lane)} onOpen={onOpen} onMove={(record) => { setMoving(record); setTarget(valueFor(record)); }} />)}</div></DndContext>
    {moving ? <div className={styles.overlay} role="dialog" aria-modal="true" aria-label={`Move ${moving.id}`}><form className={styles.moveDialog} onSubmit={(event) => { event.preventDefault(); commitMove(moving, target); setMoving(null); }}><header><div><span className={styles.eyebrow}>Accessible move</span><h2>Move {moving.id}</h2></div><button type="button" onClick={() => setMoving(null)} aria-label="Close move task"><X /></button></header><label>{mode === "category" ? "Move to requirement category" : "Move to delivery status"}<select aria-label={mode === "category" ? "Move to requirement category" : "Move to delivery status"} value={target} onChange={(event) => setTarget(event.target.value)}>{lanes.map((lane) => <option key={lane}>{lane}</option>)}</select></label><button type="submit" className={styles.primaryButton}>Move task</button></form></div> : null}
  </>;
}
