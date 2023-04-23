import { ChangeEventHandler, FC, useRef, useState } from 'react';

import { useMutation } from '@blitzjs/rpc';
import { Tag as TagType } from '@prisma/client';

import Button from 'app/core/components/Button';
import Dropdown from 'app/core/components/Dropdown';
import Flex from 'app/core/components/Flex';
import Spinner from 'app/core/components/Spinner';
import useFormField from 'app/core/hooks/useFormField';

import createTag from '../../mutations/createTag';
import getTags from '../../mutations/getTags';

import Tag from './Tag';

type TagsInputProps = {
  label: string;
  name: string;
};

type State = {
  searchText: string | null;
  foundTags: TagType[] | null;
};

const TagsInput: FC<TagsInputProps> = ({ label, name }) => {
  const { error, watch, setValue } = useFormField(name);

  const pickedTags: TagType[] | undefined = watch(name);

  const [createTagMutation, { isLoading: createTagIsLoading }] =
    useMutation(createTag);

  const [state, setState] = useState<State>({
    searchText: null,
    foundTags: null,
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const [getTagsMutation, { isLoading: getTagsIsLoading }] =
    useMutation(getTags);

  const handleChange: ChangeEventHandler<HTMLInputElement> = async e => {
    const searchText = e.target.value;
    setState(prevState => ({ ...prevState, searchText }));
    const foundTags = await getTagsMutation({
      contains: searchText,
      excludeIds: pickedTags?.map(({ id }) => id),
      limit: 3,
    });
    setState(prevState => ({ ...prevState, foundTags }));
  };
  const handleInputContainerClick = (): void => {
    inputRef.current?.focus();
  };
  const handleBlur = (): void => {
    setTimeout(
      () => setState(prevState => ({ ...prevState, searchText: null })),
      200,
    );
  };

  const handleCrateTag = async (): Promise<void> => {
    if (!state.searchText) return;
    const newTag = await createTagMutation({ title: state.searchText });
    setState(prevState => ({
      ...prevState,
      searchText: null,
      foundTags: [],
    }));
    setValue(name, [...(pickedTags ?? []), newTag]);
  };
  const handleSelectTag = (tag: TagType): void => {
    setState(prevState => ({
      ...prevState,
      searchText: null,
      foundTags: [],
    }));
    setValue(name, [...(pickedTags ?? []), tag]);
  };
  const handleRemoveTag = (tag: TagType): void => {
    setValue(
      name,
      pickedTags?.filter(({ id }) => id !== tag.id),
    );
  };

  const doesSearchedTagAlreadyExists =
    !!state.foundTags?.find(tag => tag.title === state.searchText) ||
    !!pickedTags?.find(tag => tag.title === state.searchText);
  const createNewTagOption = !doesSearchedTagAlreadyExists
    ? [
        <Button key='__newTag' simple onClick={handleCrateTag}>
          {`Create new tag: ${state.searchText}`}
        </Button>,
      ]
    : [];

  const foundTagsMappedToOptions = state.foundTags?.map(tag => (
    <Button
      key={tag.id}
      simple
      onClick={(e): void => {
        e.preventDefault();
        handleSelectTag(tag);
      }}
    >
      {tag.title}
    </Button>
  ));
  const dropdownOptions =
    createTagIsLoading || getTagsIsLoading
      ? [
          <div key='__loading'>
            <Spinner key='spinner' status='primary' />
          </div>,
        ]
      : [...(foundTagsMappedToOptions ?? []), ...createNewTagOption];

  const pickedTagsMapped = pickedTags?.map(tag => (
    <Tag
      key={tag.id}
      title={tag.title}
      onRemove={(): void => handleRemoveTag(tag)}
    />
  ));

  return (
    <div className='form-control w-full'>
      <label className='label'>
        <span className='label-text first-letter:capitalize'>{label}</span>
      </label>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-static-element-interactions */}
      <div
        className='input input-bordered w-full h-auto min-h-12 p-2'
        onClick={handleInputContainerClick}
      >
        <Flex
          direction='row'
          fullHeight
          fullWidth
          vertical='center'
          gap='1/2'
          wrap
        >
          {pickedTagsMapped}
          <input
            ref={inputRef}
            className='rounded-lg flex-grow'
            value={state.searchText ?? ''}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Flex>
      </div>
      {state.searchText && <Dropdown open options={dropdownOptions} />}
      <label className='label'>
        <span
          className={`label-text-alt text-error first-letter:capitalize transition-opacity opacity-0 ${
            error.show ? 'opacity-100' : ''
          }`}
        >
          {error.value}
        </span>
      </label>
    </div>
  );
};

export default TagsInput;
