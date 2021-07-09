const tagAll = { name: 'Все', id: 0, slug: '' };

export default function tagsFilter(tag, activeTags, setParams, setActiveTags) {
  const updateTags = [];
  const updateParams = [];

  if (tag.slug !== tagAll.slug) {
    let shouldAddClicked = true;

    activeTags.forEach((itm) => {
      if (itm.slug !== tagAll.slug) {
        if (itm.slug !== tag.slug) {
          updateTags.push(itm);
          updateParams.push(itm.slug);
        } else {
          shouldAddClicked = false;
        }
      }
    });

    if (shouldAddClicked) {
      updateTags.push(tag);
      updateParams.push(tag.slug);
    }
  } else {
    updateParams.push(tag.slug);
    updateTags.push(tag);
  }

  if (!updateTags.length) {
    updateTags.push(tagAll);
  }

  setParams(updateParams);
  setActiveTags(updateTags);
}
