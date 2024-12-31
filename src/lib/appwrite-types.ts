export interface Users {
  $id: string;
  $collectionId: string;
  $databaseId: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  user_id?: string;
  name?: string;
  email?: string;
  birthdate?: string;
  bio?: string;
  imageId?: string;
  labels?: string[];
}

export interface UsersApiResponse {
  users: {
    total: number;
    documents: Users[];
  };
}

export interface Tickets {
  $id: string;
  $collectionId: string;
  $databaseId: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  title?: string;
  description?: string;
  users?: Users;
  solution?: string;
  status?: "open" | "in-progress" | "solved" | "closed" | "under-review";
}

export interface TicketsApiResponse {
  tickets: {
    total: number;
    documents: Tickets[];
  };
}

export interface Secrets {
  $id: string;
  $collectionId: string;
  $databaseId: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  secret?: string;
  used?: boolean;
}

export interface SecretsApiResponse {
  secrets: {
    total: number;
    documents: Secrets[];
  };
}

export interface Files {
  $id: string;
  bucketId: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  name: string;
  signature: string;
  mimeType: string;
  sizeOriginal: number;
  chunksTotal: number;
  chunksUploaded: number;
}

export interface FilesApiResponse {
  files: {
    total: number;
    files: Files[];
  };
}

export interface Categories {
  $id: string;
  $collectionId: string;
  $databaseId: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  name?: string;
  slug?: string;
  description?: string;
  parent_category_id?: string;
  is_active?: boolean;
  labels?: string[];
  banner_image?: string;
}

export interface CategoriesApiResponse {
  categories: {
    total: number;
    documents: Categories[];
  };
}

export interface Plans {
  $id: string;
  $collectionId: string;
  $databaseId: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  name?: string;
  description?: string;
  price?: number;
  features?: string[];
}

export interface PlansApiResponse {
  plans: {
    total: number;
    documents: Plans[];
  };
}

