import React, { useEffect, useRef } from 'react';
import type { MergedProblem, UnitKnowledge, UnitInfo, KnowledgeSearchState } from '../../../types';
import { renderKatex } from '../../../utils/katexUtils';
import { Button } from '../../common';
import BehaviorArea from './BehaviorArea';
import UnitCandidates from './UnitCandidates';
import KnowledgeSearch from './KnowledgeSearch';
import CriteriaSection from './CriteriaSection';
import CommentSection from './CommentSection';
import styles from './InfoPanel.module.css';

interface InfoPanelProps {
  problem: MergedProblem;
  problemIndex: number;
  unitKnowledgeList: UnitKnowledge[];
  unitsData: Record<number, UnitInfo>;
  knowledgeSearchState: KnowledgeSearchState;
  canSave: boolean;
  onSetUnitNecessity: (unitIndex: number, value: boolean) => void;
  onSetKnowledgeNecessity: (unitIndex: number, knowledgeIndex: number, value: boolean) => void;
  onSetBehaviorAreaConfirmed: (value: string) => void;
  onUpdateComment: (value: string) => void;
  onSelectCurriculum: (value: string) => void;
  onSelectUnit: (unitId: number | null) => void;
  onSelectKnowledge: (knowledgeId: number | null) => void;
  onAddUnitFromSearch: () => void;
  onRemoveUnitAdded: (addIndex: number, knowledgeIndex: number) => void;
  onSave: () => void;
}

const InfoPanel: React.FC<InfoPanelProps> = ({
  problem,
  unitKnowledgeList,
  unitsData,
  knowledgeSearchState,
  canSave,
  onSetUnitNecessity,
  onSetKnowledgeNecessity,
  onSetBehaviorAreaConfirmed,
  onUpdateComment,
  onSelectCurriculum,
  onSelectUnit,
  onSelectKnowledge,
  onAddUnitFromSearch,
  onRemoveUnitAdded,
  onSave,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      renderKatex(contentRef.current);
    }
  }, [problem]);

  return (
    <div className={styles.rightSection}>
      <div className={styles.sectionHeader}>문제 정보</div>
      <div className={styles.infoContent} ref={contentRef}>
        {/* 문제 정보 */}
        <div className={styles.section}>
          <h3>문제 정보</h3>
          <div className={styles.field}>
            <div className={styles.label}>문항ID</div>
            <div className={styles.value}>{problem.problem_id}</div>
          </div>
        </div>

        {/* 행동 영역 */}
        <BehaviorArea
          behaviorArea={problem.behavior_area}
          behaviorReason={problem.behavior_reason}
          behaviorAreaConfirmed={problem.behavior_area_confirmed || ''}
          onConfirmedChange={onSetBehaviorAreaConfirmed}
        />

        {/* 단원 후보 */}
        <UnitCandidates
          unitCandidates={problem.unit_candidates}
          unitAdded={problem.unit_added}
          criteria={problem.criteria}
          unitsData={unitsData}
          onSetUnitNecessity={onSetUnitNecessity}
          onSetKnowledgeNecessity={onSetKnowledgeNecessity}
          onRemoveUnitAdded={onRemoveUnitAdded}
        />

        {/* 지식 검색 */}
        {(problem.unit_candidates.length > 0 || problem.unit_added.length > 0) && (
          <KnowledgeSearch
            unitKnowledgeList={unitKnowledgeList}
            searchState={knowledgeSearchState}
            onSelectCurriculum={onSelectCurriculum}
            onSelectUnit={onSelectUnit}
            onSelectKnowledge={onSelectKnowledge}
            onAdd={onAddUnitFromSearch}
          />
        )}

        {/* 기준 섹션 */}
        <CriteriaSection criteria={problem.criteria} unitsData={unitsData} />

        {/* 코멘트 섹션 */}
        <CommentSection comment={problem.comment} onChange={onUpdateComment} />

        {/* 저장 섹션 */}
        {canSave && (
          <div className={styles.saveSection}>
            <Button variant="save" onClick={onSave}>
              결과 저장
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoPanel;
