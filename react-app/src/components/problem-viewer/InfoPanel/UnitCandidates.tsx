import React from 'react';
import type { UnitCandidate, Criteria, UnitInfo } from '../../../types';
import { escapeHtml } from '../../../utils/dataUtils';
import NecessityControls from './NecessityControls';
import styles from './UnitCandidates.module.css';

interface UnitCandidatesProps {
  unitCandidates: UnitCandidate[];
  unitAdded: UnitCandidate[];
  criteria: Criteria[];
  unitsData: Record<number, UnitInfo>;
  onSetUnitNecessity: (unitIndex: number, value: boolean) => void;
  onSetKnowledgeNecessity: (unitIndex: number, knowledgeIndex: number, value: boolean) => void;
  onRemoveUnitAdded: (addIndex: number, knowledgeIndex: number) => void;
}

const UnitCandidates: React.FC<UnitCandidatesProps> = ({
  unitCandidates,
  unitAdded,
  criteria,
  unitsData,
  onSetUnitNecessity,
  onSetKnowledgeNecessity,
  onRemoveUnitAdded,
}) => {
  // criteria에서 knowledge_checked 정보 가져오기
  const criteriaKnowledgeMap: Record<number, boolean> = {};
  criteria.forEach((item) => {
    if (item.knowledge_id && item.knowledge_checked !== undefined) {
      criteriaKnowledgeMap[item.knowledge_id] = item.knowledge_checked;
    }
  });

  if (unitCandidates.length === 0 && unitAdded.length === 0) {
    return null;
  }

  return (
    <div className={styles.section}>
      <h3>단원 후보</h3>

      {/* 기존 단원 후보들 */}
      {unitCandidates.map((candidate, unitIdx) => {
        const knowledges = candidate.valid_knowledges || candidate.knowledges || [];

        return (
          <div key={`candidate-${unitIdx}`} className={styles.unitCandidate}>
            <div className={styles.unitHeader}>
              <div className={styles.unitNameGroup}>
                <span className={styles.unitName}>{escapeHtml(candidate.unit_name || '알 수 없음')}</span>
                <span className={styles.unitMeta}>{escapeHtml(candidate.curriculum_name || '')}</span>
                <span className={styles.confidenceScore}>
                  신뢰도: {candidate.confidence_score ? (candidate.confidence_score * 100).toFixed(2) + '%' : 'N/A'}
                </span>
              </div>
              <NecessityControls
                value={candidate.unit_necessity ?? null}
                onSetTrue={() => onSetUnitNecessity(unitIdx, true)}
                onSetFalse={() => onSetUnitNecessity(unitIdx, false)}
              />
            </div>

            {knowledges.map((knowledge, knowIdx) => {
              const knowledgeChecked = criteriaKnowledgeMap[knowledge.knowledge_id] || false;

              return (
                <div key={`knowledge-${knowIdx}`} className={styles.knowledgeItem}>
                  <div className={styles.knowledgeNameRow}>
                    <div className={styles.knowledgeName}>
                      <span>{escapeHtml(knowledge.knowledge_name || '알 수 없음')}</span>
                      {knowledgeChecked && <span className={styles.checkedIcon}>✅</span>}
                    </div>
                    <NecessityControls
                      value={knowledge.knowledge_necessity ?? null}
                      onSetTrue={() => onSetKnowledgeNecessity(unitIdx, knowIdx, true)}
                      onSetFalse={() => onSetKnowledgeNecessity(unitIdx, knowIdx, false)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}

      {/* 추가된 단원들 (빨간 테두리) */}
      {unitAdded.map((ua, addIdx) => {
        const unitInfo = unitsData[ua.unit_id] || {};
        const knowledgesAdded = ua.valid_knowledges || ua.knowledges || [];

        return (
          <div key={`added-${addIdx}`} className={`${styles.unitCandidate} ${styles.unitCandidateAdded}`}>
            <div className={styles.unitHeader}>
              <div className={styles.unitNameGroup}>
                <span className={styles.unitName}>{escapeHtml(unitInfo.unit_name || '알 수 없음')}</span>
                <span className={styles.unitMeta}>{escapeHtml(unitInfo.curriculum_name || '')}</span>
              </div>
            </div>

            {knowledgesAdded.map((k, kIdx) => {
              const knowledgeChecked = criteriaKnowledgeMap[k.knowledge_id] || false;

              return (
                <div key={`added-knowledge-${kIdx}`} className={styles.unitAddedKnowledge}>
                  <div className={styles.knowledgeName}>
                    <span>{escapeHtml(k.knowledge_name || '알 수 없음')}</span>
                    {knowledgeChecked && <span className={styles.checkedIcon}>✅</span>}
                  </div>
                  <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={() => onRemoveUnitAdded(addIdx, kIdx)}
                  >
                    삭제
                  </button>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default UnitCandidates;
