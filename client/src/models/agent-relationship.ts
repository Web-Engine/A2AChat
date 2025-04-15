export type RelationshipType = 'PARENT_CHILD' | 'PEER' | 'DEPENDENCY';

export interface AgentRelationship {
  id: string;
  sourceAgentId: string;
  targetAgentId: string;
  relationshipType: RelationshipType;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AgentRelationshipCreateRequest {
  sourceAgentId: string;
  targetAgentId: string;
  relationshipType: RelationshipType;
  description?: string;
}

export interface AgentRelationshipUpdateRequest {
  relationshipType?: RelationshipType;
  description?: string;
} 