// const matches = fileContent.match(
//   /^---\n(no-receive-emails\n)?style: (.*?)\ntitle: (.*?)\ndate: (.*?)\n(?:tags:.*?\n([\s\S]*?))?---\n([\s\S]*)$/
// );

// if (!matches) throw new Error(`文章[ ${fileName} ]头部信息解析出现错误！`);

// const [
//   noReceiveEmails,
//   stylesheet,
//   title,
//   date,
//   tags,
//   // content,
// ] = matches.slice(1);
// const tagsRe = /- (.*?)\n/g;
// const parsedTags = [titleTag(fileName)].filter((t: string) => !!t.trim());
// if (tags) {
//   let tempTag;
//   while ((tempTag = tagsRe.exec(tags))) {
//     parsedTags.push(tempTag[1]);
//   }
// }
// const body = converter.makeHtml(content);
// console.log(
//   [
//     fileName,
//     fileContent,
//     noReceiveEmails,
//     stylesheet,
//     title,
//     date,
//     tags,
//     parsedTags,
//     body,
//   ].join('\n\n')
// );
