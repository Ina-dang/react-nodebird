import { Button, Form, Input } from 'antd';
import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import { UPLOAD_IMAGES_REQUEST, addPost } from '../reducers/post';

const FormWrapper = styled(Form)`
  margin: 10px 0 20px;
`;

const ButtonStyle = styled(Button)`
  float: 'right';
`;

const PostForm = () => {
  const { imagePaths, addPostLoading, addPostDone } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();
  const imageInput = useRef();
  const [text, onChangeText, setText] = useInput('');

  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);

  const onSubmitForm = useCallback(() => {
    dispatch(addPost(text));
  }, [text]);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback((e) => {
    console.log('images', e.target.files); //배열모양을 띄는 객체
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });

    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);

  return (
    <FormWrapper encType='multipart/form-data' onFinish={onSubmitForm}>
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder='어떤 신기한 일이 있었나요?'
      />
      <div>
        <input
          onChange={onChangeImages}
          type='file'
          name='image'
          hidden
          multiple
          ref={imageInput}
        />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <ButtonStyle type='primary' htmlType='submit'>
          Twit
        </ButtonStyle>
      </div>
      <div>
        {imagePaths.map((item) => (
          <div key={item} style={{ display: 'inline-block' }}>
            <img src={item} style={{ width: '200px' }} alt={item} />
            <div>
              <Button>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </FormWrapper>
  );
};

export default PostForm;
