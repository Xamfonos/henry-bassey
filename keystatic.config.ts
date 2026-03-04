import { config, collection, fields } from '@keystatic/core';

export default config({
    storage: import.meta.env.DEV
        ? { kind: 'local' }
        : {
            kind: 'github',
            repo: 'Xamfonos/henry-bassey',
        },

    collections: {
        thoughts: collection({
            label: 'Thoughts',
            slugField: 'title',
            path: 'src/content/thoughts/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({
                    name: { label: 'Title' },
                }),
                date: fields.date({
                    label: 'Date',
                    validation: { isRequired: true },
                }),
                excerpt: fields.text({
                    label: 'Excerpt',
                    description: 'Short summary shown in the blog list. 1-2 sentences.',
                    multiline: true,
                }),
                category: fields.select({
                    label: 'Category',
                    options: [
                        { label: 'Developer Marketing', value: 'developer-marketing' },
                        { label: 'Content Strategy', value: 'content-strategy' },
                        { label: 'SEO & Growth', value: 'seo-growth' },
                        { label: 'Brand & Positioning', value: 'brand-positioning' },
                        { label: 'Frameworks', value: 'frameworks' },
                        { label: 'Performance Marketing', value: 'performance-marketing' },
                        { label: 'AI & Systems', value: 'ai-systems' },
                        { label: 'Opinion', value: 'opinion' },
                    ],
                    defaultValue: 'developer-marketing',
                }),
                tags: fields.array(
                    fields.text({ label: 'Tag' }),
                    {
                        label: 'Tags',
                        description: 'Add as many specific topic tags as needed.',
                        itemLabel: props => props.value,
                    }
                ),
                featured: fields.checkbox({
                    label: 'Featured',
                    description: 'Pin this post to the top of the list.',
                    defaultValue: false,
                }),
                content: fields.markdoc({
                    label: 'Content',
                }),
            },
        }),

        shorts: collection({
            label: 'Shorts',
            slugField: 'title',
            path: 'src/content/shorts/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({
                    name: { label: 'Title' },
                }),
                date: fields.date({
                    label: 'Date',
                    validation: { isRequired: true },
                }),
                category: fields.select({
                    label: 'Category',
                    options: [
                        { label: 'Developer Marketing', value: 'developer-marketing' },
                        { label: 'Content Strategy', value: 'content-strategy' },
                        { label: 'SEO & Growth', value: 'seo-growth' },
                        { label: 'Brand & Positioning', value: 'brand-positioning' },
                        { label: 'Frameworks', value: 'frameworks' },
                        { label: 'Performance Marketing', value: 'performance-marketing' },
                        { label: 'AI & Systems', value: 'ai-systems' },
                        { label: 'Opinion', value: 'opinion' },
                    ],
                    defaultValue: 'developer-marketing',
                }),
                tags: fields.array(
                    fields.text({ label: 'Tag' }),
                    {
                        label: 'Tags',
                        itemLabel: props => props.value,
                    }
                ),
                content: fields.markdoc({
                    label: 'Content',
                    description: 'Keep it tight. Shorts are 100-300 words.',
                }),
            },
        }),
    },
});
