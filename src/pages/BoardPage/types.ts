export interface Post {
    Title: string;
    Author: string;
    Likes: number;
    Date: string;
};
export interface PostListProps {
    posts: Post[];
}