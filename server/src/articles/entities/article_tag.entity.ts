import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Article } from "./article.entity";
import { Tag } from "./tag.entity";

@Entity('Article_tag')
export class ArticleToTag {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Article, (article) => article.tags, {onDelete: "CASCADE" })
    @JoinColumn({ name: "article_id" })
    article: Article;

    @Column()
    article_id: number;

    @ManyToOne(() => Tag, (tag) => tag.tags, {onDelete: "CASCADE" })
    @JoinColumn({ name: "tag_id" })
    tag: Tag;
    

    @Column()
    tag_id: number;

    @Column()
    order: number;
}