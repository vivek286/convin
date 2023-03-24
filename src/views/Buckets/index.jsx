import { Button, Input, Modal, Space } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import "../../styles/Buckets.css"
import { createBucket, deleteBucket, getBuckets, getCardItems, updateBucket } from '../../utils/cardSlice';
import { db } from '../../firebase';
import { addDoc, doc, setDoc } from 'firebase/firestore';

const Buckets = () => {
  const [createBucketModalOpen, setCreateBucketModalOpen] = useState(false);
  const [editBucketModalOpen, setEditBucketModalOpen] = useState(false);
  const [selectedBucket, setSelectedBucket] = useState({});
  const [newBucketName, setNewBucketName] = useState("")
  const [modBucketName, setModBucketName] = useState("")
  const { buckets, isLoading } = useSelector((store) => store.card);
  const dispatch = useDispatch();

  const createBucketHandler = async () => {
    if (newBucketName === "") return
    await dispatch(createBucket({
      id: new Date().getTime().toString() + "-bucket",
      name: newBucketName, 
      cards: []
    }))
    .then(res => {
      dispatch(getBuckets())
    })
    setNewBucketName("")
    setCreateBucketModalOpen(false)
  }

  const deleteBucketHandler = async (bucketId) => {
    await dispatch(deleteBucket(bucketId))
    .then(res  => {
      dispatch(getBuckets())
      dispatch(getCardItems())
    })
  }

  const updateBucketHandler = async () => {
    dispatch(updateBucket({id: selectedBucket.id, name: modBucketName})).then(res => {
      dispatch(getBuckets())
    })
    setEditBucketModalOpen(false)
  }

  useEffect(() => {
    if (selectedBucket) setModBucketName(selectedBucket.name)
  }, [selectedBucket])

  return (
    <div className='buckets-container'>
      {/* create bucket modal */}
      <Modal
        open={createBucketModalOpen}
        title="Create Bucket"
        onOk={createBucketHandler}
        onCancel={() => setCreateBucketModalOpen(false)}
        footer={[
          <Button key="back" onClick={() => setCreateBucketModalOpen(false)}>
            Return
          </Button>,
          <Button key="submit" type="primary" loading={isLoading} onClick={createBucketHandler}>
            Create
          </Button>,
        ]}
      >
        <div style={{margin: "10px 0px"}}>
        Enter Bucket Name : 
        </div>
        <Input placeholder="Sample Bucket" value={newBucketName} onChange={(e) => setNewBucketName(e.target.value)} />
      </Modal>

      {/* edit bucket modal */}
      <Modal
        open={editBucketModalOpen}
        title="Edit Bucket"
        onOk={updateBucketHandler}
        onCancel={() => setEditBucketModalOpen(false)}
        footer={[
          <Button key="back" onClick={() => setEditBucketModalOpen(false)}>
            Return
          </Button>,
          <Button key="submit" type="primary" loading={isLoading} onClick={updateBucketHandler}>
            Update
          </Button>,
        ]}
      >
        <div style={{margin: "10px 0px"}}>
        Enter Bucket Name : 
        </div>
        <Input placeholder="Sample Bucket" value={modBucketName} onChange={(e) => setModBucketName(e.target.value)} />
      </Modal>

      <h1 style={{ marginBottom: "25px"}}>Buckets List</h1>
      <Button style={{marginBottom: "20px"}} onClick={() => setCreateBucketModalOpen(true)}><PlusOutlined /> Create a bucket</Button>
      {buckets?.map((bucket, index) => (
        <div key={index} className='each-bucket'>
          <div>{bucket.name}</div>
          <Space>
            <Button onClick={() => {
              setSelectedBucket(bucket)
              setEditBucketModalOpen(true)
            }}>Edit</Button>
            <Button onClick={() => deleteBucketHandler(bucket.id)}>Delete</Button>
          </Space>
        </div>
      ))}
    </div>
  )
}

export default Buckets