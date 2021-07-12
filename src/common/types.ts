export interface ResponseObject {
  data: Array<GifObject>,
  pagination: PaginationObject,
}

export interface GifObject {
  id: string;
  url: string;
  bitly_url: string;
  username: string;
  user: UserObject;
  images: ImageObject;
  title: string;
}

export interface ImageObject {
  downsized_medium: {
    url: string,
  }
  downsized_small: {
    mp4: string,
  }
}

export interface PaginationObject {
  offset: number,
  count: number,
}

export interface UserObject {
  avatar_url: string;
  username: string;
  display_name: string;
}