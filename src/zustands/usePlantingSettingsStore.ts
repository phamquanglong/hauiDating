import {create, StoreApi, UseBoundStore} from 'zustand';
import {tags} from '~utils/constants';
import {images} from '~utils/images';

const trees = [
  {id: '1', icon: images.ic_tree_1, value: 1, available: true},
  {id: '2', icon: images.ic_palm_tree, value: 2, available: false},
  {id: '3', icon: images.ic_bamboo, value: 3, available: false},
];

interface PlantingSettingsType {
  tag: Tag;
  tree: Tree;
  setTag: (value: Tag) => void;
  setTree: (value: Tree) => void;
  treesList: Tree[];
  setTreesList: (value: Tree[]) => void;
  reward: number;
  setReward: (value: number) => void;
}

export const usePlantingSettingsStore: UseBoundStore<
  StoreApi<PlantingSettingsType>
> = create(set => ({
  tag: tags[0],
  tree: trees[0],
  setTag: (value: Tag) => set({tag: value}),
  setTree: (value: Tree) => set({tree: value}),
  treesList: trees,
  setTreesList: value => set({treesList: value}),
  reward: 0,
  setReward: value => set({reward: value}),
}));
